import { readInputForDay } from './common/file.js'

async function part1(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(4, useSampleData);
    const wordSearch = parseWordSearch(input);
    const allXs = findAllChars(wordSearch, 'X');
    console.log(allXs);

    return -1;
}

async function part2(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(4, useSampleData);
    
    return -1;
}

type WordSearch = string[][];
type Position = [number, number]; // row first, then column

function parseWordSearch(input: string): WordSearch {
    return input.split('\n').map(line => line.split(''));
}

function findAllChars(wordSearch: WordSearch, char: string): Position[] {
    var positions: Position[] = []
    wordSearch.forEach((row, rowIndex) => {
        row.forEach((char, colIndex) => {
            if (char === 'X') {
                positions.push([rowIndex, colIndex]);
            }
        });
    });

    return positions;
}

console.log("Part 1");
const partOneResult = await part1(true);
console.log(partOneResult);

// console.log("Part 2");
// const partTwoResult = await part2();
// console.log(partTwoResult);