// Define the files to be cached
const filesToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/images/logo.png'
];

// Define the cache version
const cacheName = 'lees-cache-v01';

// Install the service worker and cache files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

// Activate the new service worker and take control right away
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          // Delete old caches that don't match the current cache name
          return name.startsWith('lees-cache-') && name !== cacheName;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    })
    .then(function() {
      return self.clients.claim();
    })
  );
});

// Serve cached files when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
