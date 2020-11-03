importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');


if (workbox) {
  console.log(`WorkBox of TodoList loaded🎉`);
  workbox.routing.registerRoute(
    new RegExp('/.*'), //cached all files
    new workbox.strategies.StaleWhileRevalidate()
  );

  workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://fonts.googleapis.com' ||
      url.origin === 'https://fonts.gstatic.com',
      new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts',
      plugins: [
        new workbox.expiration.ExpirationPlugin({ maxEntries: 20 }),
      ],
    }),
  );


  // // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  // workbox.routing.registerRoute(
  //   ({ url }) => url.origin === 'https://fonts.googleapis.com',
  //   new workbox.strategies.StaleWhileRevalidate({
  //     cacheName: 'google-fonts-stylesheets',
  //   })
  // );

  // // Cache the underlying font files with a cache-first
  // workbox.routing.registerRoute(
  //   ({ url }) => url.origin === 'https://fonts.gstatic.com',
  //   new workbox.strategies.CacheFirst({
  //     cacheName: 'google-fonts-webfonts',

  //   })
  // );

} else { console.log(`Boo! Workbox of TodoList didn't load 😬`); }