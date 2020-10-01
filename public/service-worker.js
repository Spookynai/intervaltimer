const cacheName = "cache-v2";
const precacheResources = [
  "/",
  "addserviceworker.js",
  "index.html",
  "style.css",
  "script.js",
  "manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(precacheResources);
    })
  );
});

self.addEventListener("activate", event => {
  console.log("Service worker activate event!");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
