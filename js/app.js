if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('serviceWorker registered.', reg))
    .catch(err => console.log('serviceWorker register err.', err));
} else {
  alert('serviceWorker is not supported on this browser');
}