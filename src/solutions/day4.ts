import { readInputForDay } from '@/common/file';

export async function part1(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(4, useSampleData);
    const wordSearch = parseWordSearch(input);
    const allXs = findAllChars(wordSearch, 'X');

    var numXmas = 0;
    for (const x of allXs) {
        numXmas += numWordsAtPosition(wordSearch, x, 'XMAS').length;
    }

    return numXmas;
}

export async function part2(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(4, useSampleData);
    const wordSearch = parseWordSearch(input);
    const allMs = findAllChars(wordSearch, 'M');

    var masLocations: [Position, Direction][] = [];
    for (const m of allMs) {
        // only look for words 'MAS' in the diaganol directions
        for (const masFound of numWordsAtPosition(wordSearch, m, 'MAS', false)) {
            masLocations.push([m, masFound]);
        }
    }

    // find all the A's that are a part of 2 different MAS words - these are the 'X'
    // formation 'MAS's
    const allAs = findAllChars(wordSearch, 'A');
    var numMas = 0;
    for (const a of allAs) {
        var numWordsMatched = 0;
        for (const mas of masLocations) {
            const aLocation = applyDirection(mas[0], mas[1]);
            if (aLocation[0] === a[0] && aLocation[1] === a[1]) {
                numWordsMatched++;
            }
            if (numWordsMatched >= 2) {
                // if the 'A' is a part of 2 MAS words, then it's in an 'X'
                numMas++;
                break;
            }
        }
    }

    return numMas;
}

type WordSearch = string[][];
type Position = [number, number]; // row first, then column
type Direction = [number, number]; // same as Position, but represents a direction

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

// Returns the directions of all words [word] 
// starting from the given [position]. Returns
// an empty list if no words are found
// in any direction.
function numWordsAtPosition(
    wordSearch: WordSearch, 
    position: Position, 
    word: string,
    includeNonDiaganols: boolean = true
): Direction[] {
    var directionsToReturn: Direction[] = [];
    var directionsToCheck: Direction[] = [
        [-1, -1], [-1, 1], [1, -1], [1, 1] // up-left, up-right, down-left, down-right
    ];
    if (includeNonDiaganols) {
        // if we're looking for words in an 'X' formation, we only care about
        // the diaganols. Re-add the horizontal/verticals if not.
        directionsToCheck.push([-1, 0], [1, 0], [0, -1], [0, 1]) // up, down, left, right
    }

    for (let [dx, dy] of directionsToCheck) {
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
            directionsToReturn.push([dx, dy]);
        }
    }

    return directionsToReturn;
}

// Add the [direction] vector to the [position] vector to get a new Position
function applyDirection(position: Position, direction: Direction): Position {
    return [position[0] + direction[0], position[1] + direction[1]];
}

if (import.meta.url === `file://${process.argv[1]}`) {
    console.log("Part 1");
    const partOneResult = await part1();
    console.log(partOneResult);

    console.log("Part 2");
    const partTwoResult = await part2();
    console.log(partTwoResult);
}