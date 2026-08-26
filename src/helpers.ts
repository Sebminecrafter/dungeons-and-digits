import fs from "node:fs/promises";

export default { getStatic };

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