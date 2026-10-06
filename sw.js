const CACHE = 'postura-nico-v23';
const FILES = [
  './index.html', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png',
  './assets/exercises/split-squat.webp',
  './assets/exercises/nordic-assisted.webp',
  './assets/exercises/calf-raise.webp',
  './assets/exercises/copenhagen-short.webp',
  './assets/exercises/pogo-jumps.webp',
  './assets/exercises/broad-jump.webp',
  './assets/exercises/single-leg-bound.webp',
  './assets/exercises/cmj.webp',
  './assets/exercises/acceleration-10m.webp'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
