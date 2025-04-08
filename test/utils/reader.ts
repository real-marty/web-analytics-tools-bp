import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

export async function readFileLines(filePath: string): Promise<string[]> {
    const fullPath = path.resolve(filePath);
    const fileStream = fs.createReadStream(fullPath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity, // Handle both \n and \r\n
    });

    const lines: string[] = [];

    for await (const line of rl) {
        lines.push(line);
    }

    return lines;
}