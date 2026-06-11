self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('panther-gym-v1').then(cache =>
      cache.addAll([
        '/panther-gym/',
        '/panther-gym/index.html'
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
