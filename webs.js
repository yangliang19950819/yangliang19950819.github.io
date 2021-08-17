const cacheName = 'v1';
// const cacheAssets = ['index.html','main.js']

// self.addEventListener('install', function(event) {
//   console.log(event,'🔥')
//   event.waitUntil(caches.open(cacheName).then(cache => {
//     cache.addAll(cacheAssets)
//   }).then(() => {self.skipWaiting()})
//   )
// });


self.addEventListener('activate', function(event) {
  console.log(event,'❄️')
  event.waitUntil(caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(cache => {
      if(cache !== cacheName){
        return caches.delete(cache)
      }
    }))
  }))
});
  

self.addEventListener('fetch',e => {
  e.respondWith(
    fetch(e.request)
    .then(res => {
      const resClone  = res.clone();
      caches.open(cacheName)
      .then(cache => {
        if(e.request.url.indexOf(self.location.host) > -1){
          cache.put(e.request.url,resClone)
        }
      })
      return res
    })
    .catch(() => caches.match(e.request).then(res => res))
  )
})

self.addEventListener('message', (event) => {
    // console.log(event,'🔊')
    self.clients.matchAll().then(function(clients) {
      clients.forEach(function(client) {
        // console.log(client,'🌊')
        client.postMessage('serve service worker');
      });
    })
})




