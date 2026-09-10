import { defineConfig } from 'vite';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
// Keep the existing Astro detail available while previewing the React home.
const legacyPreview = {name:'existing-detail-preview',configureServer(server){server.middlewares.use(async(req,res,next)=>{const url=new URL(req.url,'http://localhost');let path;if(/^\/projects\/fowoco\/?$/.test(url.pathname))path='projects/fowoco/index.html';else if(url.pathname.startsWith('/_astro/'))path=url.pathname.slice(1);else return next();const root=resolve('dist'),file=resolve(root,path);if(!file.startsWith(root+sep))return next();try{const body=await readFile(file);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css'})[extname(file)]||'application/octet-stream');res.end(body)}catch{res.statusCode=503;res.end('Run npm run build to prepare the existing project detail.')}})}};
export default defineConfig({plugins:[legacyPreview],build:{emptyOutDir:false},esbuild:{jsx:'automatic'},server:{host:'127.0.0.1'}});
