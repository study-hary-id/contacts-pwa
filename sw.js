const staticCache = 'static-cache';
const dynamicCache = 'dynamic-cache';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/materialize.min.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  '/pages/fallback.html'
];

const limitNumCache = (cacheName, num) => {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > num) {
        cache.delete(keys[0]).then(limitNumCache(cacheName, num));
      }
    });
  });
};

self.addEventListener('install', e => {
  console.log('serviceWorker has installed.');
  e.waitUntil(
     caches.open(staticCache).then(cache => {
       cache.addAll(assets);
     })
   );
});

self.addEventListener('activate', e => {
  console.log('serviceWorker has activated.');
});

self.addEventListener('fetch', e => {
  if (e.request.url.indexOf('firestore.googleapis.com') === -1) {
    e.respondWith(
      // When fetch events, yep this is a loop.
      // If the request match with the caches,
      // Give the data from caches if available,
      // Otherwise fetch from the server and cache
      // the new data/response and give the new res.
      caches.match(e.request).then(staticRes => {
        return staticRes || fetch(e.request).then(dynamicRes => {
          return caches.open(dynamicCache).then(cache => {
            cache.put(e.request.url, dynamicRes.clone());
            limitNumCache(dynamicCache, 2);
            return dynamicRes;
          });
        });
      }).catch(() => caches.match('/pages/fallback.html'))
    );
  }
});