import { readInputForDay } from './common/file.js'

async function part1(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(4, useSampleData);
    const wordSearch = parseWordSearch(input);
    const allXs = findAllChars(wordSearch, 'X');

    var numXmas = 0;
    for (const x of allXs) {
        numXmas += numWordsAtPosition(wordSearch, x, 'XMAS');
    }

    return numXmas;
}

async function part2(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(4, useSampleData);
    const wordSearch = parseWordSearch(input);
    const allMs = findAllChars(wordSearch, 'M');

    var numMas = 0;
    for (const m of allMs) {
        numMas += numWordsAtPosition(wordSearch, m, 'MAS', true);
    }

    return numMas;
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
            if (char === char) {
                positions.push([rowIndex, colIndex]);
            }
        });
    });

    return positions;
}

// Returns the number of words [word] in any direction
// at the given position.
// If [inX] is true, then this function returns 1
// if the words appear in an 'X' formation and 0 otherwise.
function numWordsAtPosition(
    wordSearch: WordSearch, 
    position: Position, 
    word: string,
    inX: boolean = false,
): number {
    var numWords = 0;
    var directions: [number, number][] = [
        [-1, -1], [-1, 1], [1, -1], [1, 1] // up-left, up-right, down-left, down-right
    ];
    if (!inX) {
        // if we're looking for words in an 'X' formation, we only care about
        // the diaganols. Re-add the horizontal/verticals if not.
        directions.push([-1, 0], [1, 0], [0, -1], [0, 1]) // up, down, left, right
    }

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
            numWords++;
        }
    }

    if (inX) {
        if (numWords >= 2) {
            // if we match any 2 diaganols, it's in an 'X' formation
            return 1;
        } else {
            return 0;
        }
    }
    
    // if we're not looking for 'X' formations, just return the words found
    return numWords;
}

console.log("Part 1");
const partOneResult = await part1();
console.log(partOneResult);

console.log("Part 2");
const partTwoResult = await part2(true);
console.log(partTwoResult);