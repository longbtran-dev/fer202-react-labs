import { execFileSync } from 'node:child_process';
import { cp, mkdir, rm } from 'node:fs/promises';

const labs = ['lab1', 'lab2', 'lab3', 'lab4', 'lab5'];
const npmCli = process.env.npm_execpath;

if (!npmCli) throw new Error('Run this script through npm run build.');

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('site/index.html', 'dist/index.html');
await cp('site/styles.css', 'dist/styles.css');

for (const lab of labs) {
  execFileSync(
    process.execPath,
    [npmCli, 'run', 'build', '--workspace', `@fer202/${lab}`, '--', '--base', `/fer202-react-labs/${lab}/`],
    { stdio: 'inherit' }
  );
  await cp(`${lab}/dist`, `dist/${lab}`, { recursive: true });
}

// Tạo fallback 404.html cho GitHub Pages để khi reload trực tiếp các route con
// của Lab 5 (/lab5/naturals, /lab5/detail/1, /lab5/contact) vẫn mở đúng SPA.
await cp('dist/lab5/index.html', 'dist/lab5/404.html');
await cp('dist/lab5/index.html', 'dist/404.html');
