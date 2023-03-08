// Define the files to be cached
const filesToCache = [
  '/main.css',
  '/fonts/equity/regular.woff2',
  '/fonts/equity/bold.woff2',
  '/fonts/equity/italic.woff2',
  '/fonts/advocate/54_wide_reg.woff2',
  '/fonts/advocate/55_wide_med.woff2',
  '/fonts/advocate/56_wide_bold.woff2',
  '/fonts/advocate/slab_54_wide_reg.woff2',
  '/fonts/advocate/slab_55_wide_med.woff2',
  '/fonts/advocate/slab_56_wide_bold.woff2',
  '/fonts/concourse/6_semibold.woff2',
  '/fonts/concourse/4_medium.woff2',
  '/fonts/concourse/4_medium_italic.woff2'
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
