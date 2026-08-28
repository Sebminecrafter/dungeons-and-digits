import fs from "node:fs/promises";
import path from "node:path";

export const STATIC_DIR = path.resolve("static");

export default { getStatic, getStaticHtml, STATIC_DIR };

const header = await getStatic("html/header.html", "utf-8") ?? "<p>Failed to load</p>";
const footer = await getStatic("html/footer.html", "utf-8") ?? "<p>Failed to load</p>";

export async function getStatic(filename: string, encoding: BufferEncoding): Promise<string | null>;
export async function getStatic(filename: string, encoding?: null): Promise<Buffer | null>;
export async function getStatic(filename: string, encoding?: BufferEncoding | null): Promise<string | Buffer | null> {
    const resolved = path.resolve(STATIC_DIR, filename);

    if (!resolved.startsWith(STATIC_DIR + path.sep) && resolved !== STATIC_DIR) return null;

    try {
        const stat = await fs.stat(resolved);
        if (!stat.isFile()) return null;

        return encoding
            ? await fs.readFile(resolved, encoding)
            : await fs.readFile(resolved);
    } catch (err) {
        if (err instanceof Error) console.error(`Failed to read file '${filename}': `, err.message);
        return null;
    }
}

function getCopyDate(): string {
    let str: string = "2026"
    let year: number = new Date().getFullYear();
    if (year > 2026) str += `-${year}`;
    return str;
}

export async function getStaticHtml(filename: string, title: string): Promise<string> {
    let html: string = "";
    html += header.replaceAll("TITLESTR", title);
    html += "\n";
    html += await getStatic(`html/${filename}`);
    html += "\n";
    html += footer.replaceAll("YEARCOPY", getCopyDate());
    return html;
}