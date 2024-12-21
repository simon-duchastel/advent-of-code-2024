import { readInputForDay } from './common/file.js'

async function part1(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(4, useSampleData);
    const wordSearch = parseWordSearch(input);
    const allXs = findAllChars(wordSearch, 'X');

    var numXmas = 0;
    for (const x of allXs) {
        numXmas += numXmasAtPosition(wordSearch, x);
    }

    return numXmas;
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

// Returns the number of words 'XMAS' in any direction
// at the given position.
function numXmasAtPosition(wordSearch: WordSearch, position: Position): number {
    const word = 'XMAS';
    var numXmas = 0;
    const directions: [number, number][] = [
        [-1, 0], [1, 0], [0, -1], [0, 1], // up, down, left, right
        [-1, -1], [-1, 1], [1, -1], [1, 1] // up-left, up-right, down-left, down-right
    ];
    

    for (let [dx, dy] of directions) {
        let valid = true;
        for (let i = 0; i < word.length; i++) {
            const newRow = position[0] + (i * dx);
            const newCol = position[1] + (i * dy);

            // Check if the new position is within bounds
            if (newRow < 0 || newRow >= wordSearch.length || newCol < 0 || newCol >= wordSearch[0].length) {
                valid = false;
                break;
            }

            // Check if the character matches the current letter in 'XMAS'
            if (word[i] !== wordSearch[newRow][newCol]) {
                valid = false;
                break;
            }
        }

        // If we haven't skipped yet, the entire word is found in this direction
        if (valid) {
            numXmas++;
        }
    }

    return numXmas;
}

console.log("Part 1");
const partOneResult = await part1();
console.log(partOneResult);

// console.log("Part 2");
// const partTwoResult = await part2();
// console.log(partTwoResult);