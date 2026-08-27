import fs from "node:fs/promises";
import path from "node:path";

export default { getStatic, getStaticHtml };

const STATIC_DIR = path.resolve("static");

const cssfile = await getStatic("css/style.css") ?? "/* Failed to load, restart server! */";
const header = (await getStatic("html/header.html") ?? "<p>Failed to load</p>").replaceAll("/* CSSFILE */", cssfile);
const footer = await getStatic("html/footer.html") ?? "<p>Failed to load</p>";

export async function getStatic(filename: string): Promise<string | null> {
    const resolved = path.resolve(STATIC_DIR, filename);

    if (!resolved.startsWith(STATIC_DIR + path.sep) && resolved !== STATIC_DIR) {
        console.error(`Path traversal attempt blocked: ${filename}`);
        return null;
    }

    try {
        const stat = await fs.stat(resolved);
        if (!stat.isFile()) return null;

        const data = await fs.readFile(resolved, 'utf-8');
        return data;
    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to read file:', err.message);
        }
        return null;
    }
}

export async function getStaticHtml(filename: string, title: string): Promise<string> {
    let html: string = "";
    html += header.replaceAll("TITLESTR", title);
    html += "\n";
    html += await getStatic(`html/${filename}`);
    html += "\n";
    html += footer;
    return html;
}