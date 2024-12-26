export async function readInputForDay(
    day: number, 
    useSampleData: Boolean = false,
): Promise<string> {
    var filePath = `inputs/day${day}`;
    if (useSampleData) {
        filePath += "-sample";
    }
    filePath += ".txt";

    try {
        const response = await fetch(filePath);
        const data = await response.text();
        if (!response.ok || data === "") {
            throw Error("No input data found");
        }

        return data;
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        throw error;
    }
}