const CACHE_NAME = 'version-1';
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;

// Install SW
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');

                return cache.addAll(urlsToCache);
            })
    );
});

// Listen for requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                            .catch(() => caches.match('offline.html'));
            })
    );
});

// Activate the SW
self.addEventListener('activate', event => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.map(cacheName => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    );
});

// Close notifications event
self.addEventListener('notificationclose', function(e) {
    let notification = e.notification;
    let primaryKey = notification.data.primaryKey;
  
    console.log('Closed notification: ' + primaryKey);
});

// Click notifications event
self.addEventListener('notificationclick', function(e) {
    let notification = e.notification;
    let primaryKey = notification.data.primaryKey;
    let action = e.action;
  
    if (action === 'close') {
      notification.close();
    } else {
      self.clients.openWindow('index.html');
      notification.close();
    }
});