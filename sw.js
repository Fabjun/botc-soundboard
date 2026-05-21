// Cache name — bump the version string whenever index.html changes significantly
// so that the old cache is replaced on next visit.
const CACHE = 'storyteller-v17';

// The single asset to cache: the root document of this scope.
// On GitHub Pages this resolves to index.html at /botc-soundboard/.
const SHELL = ['./'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL))
  );
  // Activate immediately without waiting for old tabs to close
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Delete all caches that don't match the current version
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Only handle GET requests to our own origin
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;

      // Not in cache — try network, cache the response if successful
      return fetch(e.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline and not in cache — serve the app shell as fallback
        // so navigation requests always return something
        return caches.match('./');
      });
    })
  );
});
