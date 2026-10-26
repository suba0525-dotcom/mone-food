const CACHE_NAME = "mone-food-v1";
const APP_FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES))); self.skipWaiting(); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))); self.clients.claim(); });
self.addEventListener("fetch", event => { const req=event.request; if(req.method!=="GET" || new URL(req.url).origin!==self.location.origin) return; event.respondWith(caches.match(req).then(cached=>cached || fetch(req).then(res=>{ if(res && res.ok) caches.open(CACHE_NAME).then(cache=>cache.put(req,res.clone())); return res; })).catch(()=>caches.match("./index.html"))); });
