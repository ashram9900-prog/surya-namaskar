const CACHE = 'surya-namaskar-v1';

const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/images/Surya-Namaskar-step-1.jpg.webp',
  '/images/Surya-Namaskar-step-2.jpg.webp',
  '/images/Surya-Namaskar-step-3.jpg.webp',
  '/images/Surya-Namaskar-step-4.jpg.webp',
  '/images/Surya-Namaskar-step-5.jpg.webp',
  '/images/Surya-Namaskar-step-6.jpg.webp',
  '/images/Surya-Namaskar-step-7.jpg.webp',
  '/images/Surya-Namaskar-step-8.jpg.webp',
  '/images/Surya-Namaskar-step-9.jpg.webp',
  '/images/Surya-Namaskar-step-10.jpg.webp',
  '/images/Surya-Namaskar-step-11.jpg.webp',
  '/images/Surya-Namaskar-step-12.jpg.webp',
  '/sounds/background.mp3',
  '/sounds/step-1-pranamasana.m4a',
  '/sounds/step-2-11-hasta-uttanasana.m4a',
  '/sounds/step-3-10-hasta-padasana.m4a',
  '/sounds/step-4-ashwa-sanchalanasana-right.m4a',
  '/sounds/step-4-ashwa-sanchalanasana-left.m4a',
  '/sounds/step-5-dandasana.m4a',
  '/sounds/step-6-ashtanga-namaskara.m4a',
  '/sounds/step-7-bhujangasana.m4a',
  '/sounds/step-8-adho-mukha-svanasana.m4a',
  '/sounds/step-9-ashwa-sanchalanasana-right-forward.m4a',
  '/sounds/step-9-ashwa-sanchalanasana-left-forward.m4a',
  '/sounds/step-12-tadasana.mp4'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
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
