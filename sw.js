const cacheName = "clock";
const contentToCache = [
	"./",
	"./index.html",
	"./index.css",
	"./index.js",
	"./worker.js",
	"./sw.js",
	"./icons/logo-icon32.png",
	"./icons/logo-icon192.png",
	"./icons/logo-icon512.png",
	"./icons/maskable-icon192.png",
	"./icons/maskable-512.png",
	"./site.webmanifest",
	"./icons/icon180.png",
];

self.addEventListener("install", (e) => {
	console.log("Service Worker installed");
	e.waitUntil(
		(async () => {
			const cache = await caches.open(cacheName);
			await cache.addAll(contentToCache).catch(err => console.log(err));
		})()
	);
});

self.addEventListener("fetch", function (event) {
	event.respondWith(fetch(event.request).then((res) => {
		let response = res.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, response);
        });
		return res
	}).catch((err) => {
		return caches.match(event.request)
	})
	);
});
