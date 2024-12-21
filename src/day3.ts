import { readInputForDay } from './common/file.js'

async function part1(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(3, useSampleData);
    const mulInstructions = parseMulInstructions(input);

    var sum = 0;
    for (const instruction of mulInstructions) {
        sum += instruction[0] * instruction[1];
    }

    return sum;
}

async function part2(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(3, useSampleData);
    
    return -1;
}

type MulInstruction = [number, number];

function parseMulInstructions(input: string): MulInstruction[] {
    const regex = "/mul\([0-9]+,[0-9]+\)/g";
    var mulInstructions: MulInstruction[] = [];
    const matches = input.match(regex);
    if (!matches || matches.length === 0) { // if we have no matches return empty list
        return [];
    }
    for (const match of matches) {
        const mulRegex = "/([0-9]+),([0-9)+/g";
        const mulMatches = match[0].match(mulRegex);
        if (!mulMatches || mulMatches.length !== 3) {
            // if we don't find the numbers we expect, skip this match
            // length is 3 because [0] is the entire match, [1] and [2] are
            // the groups
            continue;
        }

        const firstNum = parseInt(mulMatches[1]);
        const secondNum = parseInt(mulMatches[2]);
        mulInstructions.push([firstNum, secondNum]);
    }

    return mulInstructions;
}

console.log("Part 1");
const partOneResult = await part1(true);
console.log(partOneResult);

// console.log("Part 2");
// const partTwoResult = await part2(true);
// console.log(partTwoResult);