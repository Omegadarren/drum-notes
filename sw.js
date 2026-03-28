// BandNotes Service Worker — offline-first shell caching
const SHELL_CACHE = 'bandnotes-shell-v2';
const CDN_CACHE   = 'bandnotes-cdn-v2';

const CDN_PRECACHE = [
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage-compat.js',
];

// Install: pre-cache CDN scripts immediately (best-effort, don't fail install)
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CDN_CACHE).then(cache =>
      Promise.allSettled(
        CDN_PRECACHE.map(url =>
          fetch(url, { mode: 'no-cors' })
            .then(r => cache.put(url, r))
            .catch(() => {})
        )
      )
    )
  );
});

// Activate: take control of all open tabs immediately
self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // ── Known CDN library scripts — cache-first ────────────────────────────────
  // Only intercept the specific versioned CDN URLs we pre-cached at install.
  // All other cross-origin requests (Firebase Auth/Firestore APIs etc.) are
  // intentionally ignored here so the browser network stack handles them normally.
  if (CDN_PRECACHE.includes(url.href)) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(response => {
          const clone = response.clone();
          caches.open(CDN_CACHE).then(cache => cache.put(e.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // ── Cross-origin requests not in the CDN list (Firebase APIs, etc.) ────────
  // Do NOT intercept — let the browser make a normal network request so that
  // Firebase Auth and Firestore work correctly.
  if (url.origin !== self.location.origin) return;

  // ── Same-origin (app shell / index.html) — stale-while-revalidate ─────────
  // Serve from cache instantly; silently update the cache from network.
  // The updated version is ready for the next load — no user action needed.
  e.respondWith(
    caches.open(SHELL_CACHE).then(cache =>
      cache.match(e.request).then(cached => {
        const networkFetch = fetch(e.request)
          .then(response => {
            if (response.ok) cache.put(e.request, response.clone());
            return response;
          })
          .catch(() => null);
        // Serve cache immediately if available; otherwise wait for network
        return cached || networkFetch;
      })
    )
  );
});
