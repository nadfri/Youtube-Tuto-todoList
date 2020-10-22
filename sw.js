console.log("Script /sw.js Chargé!");

// const CACHE  = "todo-cache";
// const urlsToCache = [
//     '**.html'

// ];


// self.addEventListener('install', event => {
//     console.log("Service Worker installé!");
//     event.waitUntil(
//         caches.open(CACHE)
//         .then(cache => {
//         return cache.addAll(urlsToCache);
//         })
//     );
// });

// self.addEventListener('activate', event => {
//     console.log("Service Worker activé!");
// });

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log(`WorkBox of  loaded🎉`);
  workbox.routing.registerRoute(
    new RegExp('/*/.*'), //cached all files
    new workbox.strategies.StaleWhileRevalidate()
  );

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
    workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );
  
  // Cache the underlying font files with a cache-first strategy for 1 year.
  workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      
    })
  );

} else {console.log(`Boo! Workbox didn't load 😬`);}