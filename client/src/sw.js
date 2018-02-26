const CACHE_VERSION = 1;

const CACHE_NAME = `mapE_v${CACHE_VERSION}`;
const urlsToCache = [
  '/',
  '/bundle.js',
  '/index.js',
  '/sw.js',
  '/style/index.css',
  '/assets/icons/leaflet/marker-icon.png',
  '/assets/icons/leaflet/marker-shadow.png',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }).catch(function(err) {
          console.log('Cache install failed: ', err);
      })
  );
});

self.addEventListener('activate', event => {
    // delete any caches that aren't CACHE_NAME
    // which will get rid of previous caches
    event.waitUntil(
      caches.keys().then(keys => Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )).then(() => {
        console.log(`${CACHE_NAME} is now ready to handle fetches!`);
      })
    );
  });

self.addEventListener('fetch', function(event) {
  const re = new RegExp('signin|register');
  if (event.request.url.match(re)) {
    console.log("DONOTCACHE:" + event.request.url);
    return event.respondWith(function () {
      return fetch(event.request);
    }());
  }
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }

          // IMPORTANT: Clone the request. A request is a stream and
          // can only be consumed once. Since we are consuming this
          // once by cache and once by the browser for fetch, we need
          // to clone the response.
          const fetchRequest = event.request.clone();

          return fetch(fetchRequest).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });

              return response;
            }
          );
        })
      );
  });
