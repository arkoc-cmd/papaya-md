const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2'
};

const ROUTE_ALIASES = {
  "/weight-loss": "/treatments/weight-loss.html",
  "/weight-loss.html": "/treatments/weight-loss.html",
  "/treatments/weight-loss": "/treatments/weight-loss.html",
  "/treatments/weight-loss.html": "/treatments/weight-loss.html",
  '/': '/index.html',
  '/hormone-women': '/treatments/hormone-women.html',
  '/hormone-women.html': '/treatments/hormone-women.html',
  '/treatments/hormone-women': '/treatments/hormone-women.html',
  '/women-hormone': '/treatments/hormone-women.html',
  '/women-hormone.html': '/treatments/hormone-women.html',
  '/treatments/women-hormone.html': '/treatments/hormone-women.html',
  '/estradiol-patch': '/treatments/estradiol-patch.html',
  '/estradiol-patch.html': '/treatments/estradiol-patch.html',
  '/treatments/estradiol-patch': '/treatments/estradiol-patch.html',
  '/intake-women': '/treatments/intake-women.html',
  '/intake-women.html': '/treatments/intake-women.html',
  '/treatments/intake-women': '/treatments/intake-women.html',
  '/checkout': '/checkout.html',
  '/treatments/checkout.html': '/checkout.html',
  '/treatments/checkout': '/checkout.html'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  
  // Check exact aliases
  if (ROUTE_ALIASES[reqPath]) {
    reqPath = ROUTE_ALIASES[reqPath];
  } else if (reqPath.endsWith('/') && reqPath.length > 1) {
    const trimmed = reqPath.slice(0, -1);
    if (ROUTE_ALIASES[trimmed]) reqPath = ROUTE_ALIASES[trimmed];
  }
  
  let safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePath);

  // Fallback checks
  if (!fs.existsSync(filePath)) {
    const rootCandidate = path.join(__dirname, path.basename(safePath));
    const treatmentsCandidate = path.join(__dirname, 'treatments', path.basename(safePath));

    if (fs.existsSync(treatmentsCandidate)) {
      filePath = treatmentsCandidate;
    } else if (fs.existsSync(rootCandidate)) {
      filePath = rootCandidate;
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>Page Not Found — PapayaMD</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 60px;">
          <h2>404 — Page Not Found</h2>
          <p>Requested: <code>${reqPath}</code></p>
          <p><a href="/index.html">Return to PapayaMD Homepage</a></p>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

const PORT = 3000;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`[PapayaMD Server] Running at http://localhost:${PORT}/`);
  console.log(`[PapayaMD Homepage] http://localhost:${PORT}/index.html`);
  console.log(`[PapayaMD Women HRT] http://localhost:${PORT}/treatments/hormone-women.html`);
  console.log(`[PapayaMD Estradiol Patch] http://localhost:${PORT}/treatments/estradiol-patch.html`);
  console.log(`[PapayaMD Checkout] http://localhost:${PORT}/checkout.html`);
});
