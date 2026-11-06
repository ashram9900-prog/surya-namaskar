const CACHE = 'surya-namaskar-v4';
const BASE = '/surya-namaskar';

const ASSETS = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/manifest.json',
  BASE + '/icon-192.png',
  BASE + '/icon-512.png',
  BASE + '/images/Surya-Namaskar-step-1.jpg.webp',
  BASE + '/images/Surya-Namaskar-step-2.jpg.webp',
  BASE + '/images/Surya-Namaskar-step-3.jpg.webp',
  BASE + '/images/Surya-Namaskar-step-4.jpg.webp',
  BASE + '/images/Surya-Namaskar-step-5.jpg.webp',
  BASE + '/images/Surya-Namaskar-step-6.jpg.webp',
  BASE + '/images/Surya-Namaskar-step-7.jpg.webp',
  BASE + '/images/Surya-Namaskar-step-8.jpg.webp',
  BASE + '/images/Surya-Namaskar-step-9.jpg.webp',
  BASE + '/images/Surya-Namaskar-step-10.jpg.webp',
  BASE + '/images/Surya-Namaskar-step-11.jpg.webp',
  BASE + '/images/Surya-Namaskar-step-12.jpg.webp',
  BASE + '/sounds/background.mp3',
  BASE + '/sounds/step-1-pranamasana.m4a',
  BASE + '/sounds/step-2-11-hasta-uttanasana.m4a',
  BASE + '/sounds/step-3-10-hasta-padasana.m4a',
  BASE + '/sounds/step-4-ashwa-sanchalanasana-right.m4a',
  BASE + '/sounds/step-4-ashwa-sanchalanasana-left.m4a',
  BASE + '/sounds/step-5-dandasana.m4a',
  BASE + '/sounds/step-6-ashtanga-namaskara.m4a',
  BASE + '/sounds/step-7-bhujangasana.m4a',
  BASE + '/sounds/step-8-adho-mukha-svanasana.m4a',
  BASE + '/sounds/step-9-ashwa-sanchalanasana-right-forward.m4a',
  BASE + '/sounds/step-9-ashwa-sanchalanasana-left-forward.m4a',
  BASE + '/sounds/step-12-tadasana.mp4'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      // Cache each asset individually so one failure doesn't break the rest
      Promise.all(ASSETS.map(url =>
        cache.add(url).catch(() => {}) // swallow per-file errors
      ))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
