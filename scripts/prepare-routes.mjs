import { mkdir, copyFile } from 'node:fs/promises';
for(const slug of ['fowoco','hwpx','ownhands','llm-gateway']){await mkdir(`dist/projects/${slug}`,{recursive:true});await copyFile('dist/index.html',`dist/projects/${slug}/index.html`)}
await copyFile('dist/index.html','dist/404.html');
