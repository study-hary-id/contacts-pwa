self.addEventListener('install', e => {
  console.log('serviceWorker has installed.');
});

self.addEventListener('activate', e => {
  console.log('serviceWorker has activated.');
});

self.addEventListener('fetch', e => {
  console.log('serviceWorker fetch events', e);
});