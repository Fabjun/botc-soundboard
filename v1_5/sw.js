const VERSION = '1.5.16';
const CACHE = `sos-v1_5-${VERSION}`;
const ASSETS = [
  './index.html',
  './styles.css',
  './app.js',
  './audio.js',
  './flame.js',
  './manifest.json',
  '../fonts/press-start-2p.woff2',
  '../fonts/share-tech-mono.woff2',
  '../fonts/vt323.woff2',
  '../fonts/dotgothic16.woff2',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
    // No skipWaiting here — activation is triggered by the app via SKIP_WAITING message
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
