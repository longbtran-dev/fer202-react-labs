import { execFileSync } from 'node:child_process';
import { cp, mkdir, rm } from 'node:fs/promises';

const labs = ['lab1', 'lab2', 'lab3'];
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
