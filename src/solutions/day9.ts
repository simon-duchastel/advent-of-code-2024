import { readInputForDay } from '@/common/file';

export async function part1(useSampleData: boolean = false): Promise<number> {
    const input = await readInputForDay(9, useSampleData);
    const spaces = parseInput(input);

    // increment through all the spaces and add them to a new rearranged list
    const rearrangedSpaces: Space[] = [];
    let leftIndex = 0;
    let rightIndex = spaces.length - 1;
    while (leftIndex <= rightIndex) {
        if (spaces[leftIndex].blockType === "File") {
            // we always add files
            rearrangedSpaces.push(spaces[leftIndex]);
            leftIndex++;
            continue;
        }

        // add the right-hand blocks to the left
        let spaceRemaining = spaces[leftIndex].blockSize;
        while (spaceRemaining > 0 && rightIndex >= leftIndex) {
            if (spaces[rightIndex].blockType === "File") {
                const spaceToAdd = Math.min(spaceRemaining, spaces[rightIndex].blockSize);
                rearrangedSpaces.push({
                    blockId: spaces[rightIndex].blockId,
                    blockType: "File",
                    blockSize: spaceToAdd,
                });
                spaceRemaining -= spaceToAdd;
        
                if (spaceToAdd === spaces[rightIndex].blockSize) {
                    rightIndex--; // Fully consumed this block
                } else {
                    spaces[rightIndex].blockSize -= spaceToAdd; // Partially consumed
                }
            } else {
                rightIndex--; // Skip non-file blocks
            }
        }        
        leftIndex++;
    }

    return calculateChecksum(rearrangedSpaces);
}

export async function part2(useSampleData: boolean = false): Promise<number> {
    const input = await readInputForDay(9, useSampleData);
    const spaces = parseInput(input);

    // increment through all the spaces and add them to a new rearranged list
    const rearrangedSpaces: Space[] = [];
    const remainingSpaces: Space[] = []; // the spaces which didn't fit
    let leftIndex = 0;
    let rightIndex = spaces.length - 1;
    while (leftIndex <= rightIndex) {
        if (spaces[leftIndex].blockType === "File") {
            // we always add files
            rearrangedSpaces.push(spaces[leftIndex]);
            leftIndex++;
            continue;
        }

        // add the right-hand blocks to the left
        let spaceRemaining = spaces[leftIndex].blockSize;
        while (spaceRemaining > 0 && rightIndex >= leftIndex) {
            if (spaces[rightIndex].blockType === "File") {
                if (spaceRemaining < spaces[rightIndex].blockSize) {
                    remainingSpaces.unshift(spaces[rightIndex]);
                    rightIndex--;
                    continue; // if there's not enough space don't move it
                }
                rearrangedSpaces.push({
                    blockId: spaces[rightIndex].blockId,
                    blockType: "File",
                    blockSize: spaces[rightIndex].blockSize,
                });
                spaceRemaining -= spaces[rightIndex].blockSize;
            } else {
                remainingSpaces.unshift(spaces[rightIndex]);
            }
            rightIndex--;
        }        
        leftIndex++;
    }

    // add all remaining blocks
    rearrangedSpaces.push(...remainingSpaces);
console.log(prettyPrintSpaces(rearrangedSpaces));
    return calculateChecksum(rearrangedSpaces);
}

type SpaceType = "File" | "Free"
type Space = {
    blockSize: number,
    blockType: SpaceType,
    blockId: number | undefined,
}

function parseInput(input: string): Space[] {
    let blockType: SpaceType = "File";
    let blockId = 0;

    return input.split("")
        .map((char) => parseInt(char)) 
        .map((int) => {
            const space: Space = {
                blockSize: int,
                blockType: blockType,
                blockId: blockType === "File" ? blockId : undefined,
            };
            if (blockType === "File") {
                blockType = "Free";
                blockId++;
            } else {
                blockType = "File";
            }
            return space
        });
}

// prints a visual map of the filesystem. Useful for debugging.
// WARNING - can be long, so only use for small inputs
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function prettyPrintSpaces(spaces: Space[]): string {
    return spaces.map((space) => 
        Array.from(
            {length: space.blockSize}, 
            () => space.blockType === "File" ? space.blockId : "."
        ).join("")
    ).join("");
}

function calculateChecksum(spaces: Space[]): number {
    let checksum = 0;
    let position = 0;
    for (const space of spaces) {
        if (space.blockType === "File" && space.blockId !== undefined) {
            for (let i = 0; i < space.blockSize; i++) {
                checksum += (position + i) * space.blockId;
            }
        }

        position += space.blockSize;
    }
    return checksum;
}

if (import.meta.url === `file://${process.argv[1]}`) {    
    console.log("Part 1");
    const partOneResult = await part1();
    console.log(partOneResult);

    console.log("Part 2");
    const partTwoResult = await part2(true);
    console.log(partTwoResult);
}
