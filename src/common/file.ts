import path from 'path';

// Dynamically import fs only in Node.js environments
let fs: typeof import('fs') | null = null;
if (typeof window === 'undefined') {
    fs = await import('fs');
}

export async function readInputForDay(
    day: number, 
    useSampleData: boolean = false,
): Promise<string> {
    let filePath = `inputs/day${day}`;
    if (useSampleData) {
        filePath += "-sample";
    }
    filePath += ".txt";

    // Check if we're in the browser environment (Next.js).
    if (typeof window !== 'undefined') {
        const publicFilePath = `/inputs/day${day}.txt`;
        if (useSampleData) {
            filePath = `/inputs/day${day}-sample.txt`;
        }

        try {
            const response = await fetch(publicFilePath);
            const data = await response.text();
            if (!response.ok || data === "") {
                throw Error("No input data found");
            }
            return data;
        } catch (error) {
            console.error(`Error reading file ${publicFilePath}:`, error);
            throw error;
        }
    } else if (fs) {
        // Node.js environment – use fs to read the file locally.
        const filePathOnServer = path.resolve(filePath);

        try {
            const data = await fs.promises.readFile(filePathOnServer, 'utf-8');
            if (!data) {
                throw new Error("No input data found");
            }
            return data;
        } catch (error) {
            console.error(`Error reading file ${filePathOnServer}:`, error);
            throw error;
        }
    } else {
        throw new Error('Environment is not supported for file reading');
    }
}
