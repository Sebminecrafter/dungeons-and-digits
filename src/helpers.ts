import fs from "node:fs/promises";

export default { getStatic, getStaticHtml };

const cssfile = await getStatic("css/style.css");

export async function getStatic(filename: string): Promise<string> {
    try {
        const data = await fs.readFile(`static/${filename}`, 'utf-8');
        return data;
    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to read file:', err.message);
        }
        return "Failed to read file.";
    }
}

export async function getStaticHtml(filename: string, title: string): Promise<string> {
    let html: string = "";
    html += (await getStatic("html/header.html"))
        .replaceAll("TITLESTR", title)
        .replaceAll("CSSFILE", cssfile);
    html += "\n";
    html += await getStatic(`html/${filename}`);
    html += "\n";
    html += await getStatic("html/footer.html");
    return html;
}