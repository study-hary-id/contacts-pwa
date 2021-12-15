self.addEventListener('install', e => {
  console.log('serviceWorker has installed.');
});

self.addEventListener('activate', e => {
  console.log('serviceWorker has activated.');
});