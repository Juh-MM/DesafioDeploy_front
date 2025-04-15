self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('complaints-store').then((cache) => cache.addAll([
            '/index.html',
            '/css/styles.css',
            '/js/app.js',
            '/manifest.json'
        ]))
    );
});

self.addEventListener('fetch', (e) => {
    const url = new URL(e.request.url);

    // Só intercepta requisições do mesmo domínio (mesmo host)
    if (url.origin === self.location.origin) {
        e.respondWith(
            caches.match(e.request).then((response) => response || fetch(e.request))
        );
    }
});