import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const clientDir = path.join(distDir, 'client');
const serverDir = path.join(distDir, 'server');

if (fs.existsSync(clientDir)) {
  // Copy all files from dist/client to dist root so Cloudflare Pages works whether output dir is "dist" or "dist/client"
  const clientEntries = fs.readdirSync(clientDir);
  for (const entry of clientEntries) {
    const src = path.join(clientDir, entry);
    const dest = path.join(distDir, entry);
    if (!fs.existsSync(dest)) {
      fs.cpSync(src, dest, { recursive: true });
    }
  }

  // Create _worker.js in dist root
  fs.writeFileSync(
    path.join(distDir, '_worker.js'),
    `export { default } from './server/entry.mjs';\n`
  );

  // Create _worker.js in dist/client as well
  fs.writeFileSync(
    path.join(clientDir, '_worker.js'),
    `export { default } from '../server/entry.mjs';\n`
  );

  // Create _routes.json for Cloudflare Pages routing
  const routesConfig = JSON.stringify(
    {
      version: 1,
      include: ['/*'],
      exclude: ['/_astro/*', '/certificates/*', '/cv.pdf', '/favicon.svg', '/profile.jpg', '/sitemap*.xml'],
    },
    null,
    2
  );
  fs.writeFileSync(path.join(distDir, '_routes.json'), routesConfig);
  fs.writeFileSync(path.join(clientDir, '_routes.json'), routesConfig);

  console.log('✓ Cloudflare Pages postbuild completed: _worker.js and static files prepared in dist and dist/client.');
}
