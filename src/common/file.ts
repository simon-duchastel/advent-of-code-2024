import { readFile } from 'fs/promises';

export async function readInputForDay(day: number, sample: Boolean = false) {
    var filePath = `inputs/day${day}`;
    if (sample) {
        filePath += "-sample";
    }
    filePath += ".txt";

    try {
        const data = await readFile(filePath, 'utf8');
        return data;
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        throw error;
    }
}