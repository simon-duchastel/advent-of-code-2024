import { readInputForDay } from '@/common/file';

export async function part1(useSampleData: boolean = false): Promise<number> {
    const input = await readInputForDay(3, useSampleData);
    const mulInstructions = parseMulInstructions(input, false);

    let sum = 0;
    for (const instruction of mulInstructions) {
        sum += instruction[0] * instruction[1];
    }

    return sum;
}

export async function part2(useSampleData: boolean = false): Promise<number> {
    const input = await readInputForDay(3, useSampleData);
    const mulInstructions = parseMulInstructions(input, true);

    let sum = 0;
    for (const instruction of mulInstructions) {
        sum += instruction[0] * instruction[1];
    }

    return sum;
}

type MulInstruction = [number, number];

function parseMulInstructions(input: string, withConditionals: boolean): MulInstruction[] {
    const regex = /(mul\([0-9]+,[0-9]+\))|(do(n't)?\(\))/g;
    const mulInstructions: MulInstruction[] = [];
    const matches = input.match(regex);
    if (!matches || matches.length === 0) { // if we have no matches return empty list
        return [];
    }

    let mulIsDisabled = false;
    for (const match of matches) {
        if (match === "don't()") {
            // mul instructions are now disabled
            mulIsDisabled = true;
            continue;
        }
        if (match === "do()") {
            // mul instructions are now re-enabled
            mulIsDisabled = false;
            continue;
        }
        if (withConditionals && mulIsDisabled) {
            // skip if mul instructions are disabled
            continue;
        }

        const mulRegex = /mul\(([0-9]+),([0-9]+)\)/;
        const mulMatches = match.match(mulRegex);
        if (!mulMatches || mulMatches.length < 3) {
            // if we don't find the numbers we expect, skip this match
            // first index is the total match, next two are the numbers (groups)
            continue;
        }

        const firstNum = parseInt(mulMatches[1]);
        const secondNum = parseInt(mulMatches[2]);
        mulInstructions.push([firstNum, secondNum]);
    }

    return mulInstructions;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    console.log("Part 1");
    const partOneResult = await part1();
    console.log(partOneResult);

    console.log("Part 2");
    const partTwoResult = await part2();
    console.log(partTwoResult);
}
