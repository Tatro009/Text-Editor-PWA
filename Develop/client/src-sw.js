const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

// Cache the application shell (HTML) and other important assets
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxEntries: 10, // Limit the number of entries in the cache
      maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
    }),
  ],
});

// Warm the cache with essential assets
warmStrategyCache({
  urls: ['/index.html', '/'], // URLs to cache
  strategy: pageCache, // Use the CacheFirst strategy
});

// TODO: Implement asset caching
registerRoute(
  /\.(?:js|css|png|jpg|jpeg|svg|gif)$/, // RegExp to match asset URLs
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100, // Limit the number of entries in the cache
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
      }),
    ],
  })
);

// Register a route to handle navigation requests
registerRoute(({ request }) => request.mode === 'navigate', ({ event }) => {
  // Return the cached response for navigation requests
  return caches.match('/index.html');
});

// Implement offline fallback strategy
offlineFallback();
