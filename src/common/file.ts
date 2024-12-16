import { readFile } from 'fs/promises';

export async function readInputForDay(day: number) {
    const filePath = `inputs/day${day}.txt`;
    try {
        const data = await readFile(filePath, 'utf8');
        return data;
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        throw error;
    }
}