// Inject the server-rendered app into dist/index.html (run after `vite build --ssr`).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const { render } = await import(pathToFileURL(path.join(root, "dist-ssr/entry-server.js")).href);
const file = path.join(root, "dist/index.html");
const html = fs.readFileSync(file, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error("prerender: #root placeholder not found in dist/index.html");
fs.writeFileSync(file, html.replace(marker, `<div id="root">${render()}</div>`));
console.log("prerender: wrote", path.relative(root, file));
