const staticCache = 'static-cache';
const dynamicCache = 'dynamic-cache';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/materialize.min.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];

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
          return dynamicRes;
        });
      });
    })
  );
});