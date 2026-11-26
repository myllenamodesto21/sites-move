/* Service worker: cache offline básico. Mude a VERSAO a cada publicação para renovar o cache. */
const VERSAO = "move-sob-medida-v2";
const ESSENCIAIS = [
  "./",
  "index.html",
  "css/style.css",
  "js/config.js",
  "js/main.js",
  "manifest.webmanifest",
  "assets/icons/favicon.svg",
  "assets/marca/move-claro.webp",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png"
];

self.addEventListener("install", (ev) => {
  ev.waitUntil(caches.open(VERSAO).then((c) => c.addAll(ESSENCIAIS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (ev) => {
  ev.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n !== VERSAO).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (ev) => {
  const req = ev.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Páginas, config e scripts: rede primeiro (dados sempre atualizados), cache se estiver offline.
  const daRede = req.mode === "navigate" || /\.(js|css|webmanifest)$/.test(url.pathname);
  if (url.origin === location.origin && daRede) {
    ev.respondWith(
      fetch(req)
        .then((res) => {
          const copia = res.clone();
          caches.open(VERSAO).then((c) => c.put(req, copia));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("index.html")))
    );
    return;
  }

  // Imagens e fontes (inclusive Google Fonts): cache primeiro.
  if (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    ev.respondWith(
      caches.match(req).then((guardada) =>
        guardada ||
        fetch(req).then((res) => {
          if (res.ok || res.type === "opaque") {
            const copia = res.clone();
            caches.open(VERSAO).then((c) => c.put(req, copia));
          }
          return res;
        })
      )
    );
  }
});
