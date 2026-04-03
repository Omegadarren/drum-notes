// BandNotes Service Worker — offline-first shell caching
const SHELL_CACHE = 'bandnotes-shell-v4';
const CDN_CACHE   = 'bandnotes-cdn-v2';
const ALL_CACHES  = [SHELL_CACHE, CDN_CACHE];

const CDN_PRECACHE = [
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage-compat.js',
];

// Install: pre-cache CDN scripts; skip waiting so new SW activates immediately
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

// Activate: delete ALL old caches, then claim clients immediately
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !ALL_CACHES.includes(k)).map(k => caches.delete(k))
      ))
      .then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // NEVER intercept the service worker script itself — browser must always
  // fetch it fresh from the network to detect updates.
  if (url.pathname.endsWith('/sw.js')) return;

  // ── Known CDN library scripts — cache-first ───────────────────────────────
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

  // ── Cross-origin (Firebase APIs, etc.) — pass through untouched ───────────
  if (url.origin !== self.location.origin) return;

  // ── Same-origin app shell — network-first, cache as fallback ─────────────
  // Always try the network so the latest index.html is served when online.
  // Only fall back to cache when offline.
  e.respondWith(
    fetch(e.request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(SHELL_CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
