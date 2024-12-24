import { readInputForDay } from './common/file.js';

async function part1(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(7, useSampleData);
    const instructions = parseInstructions(input);

    return -1;
}

async function part2(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(7, useSampleData);
    const instructions = parseInstructions(input);
    
    return -1;
}

type Instruction = {
    expected: number,
    numbers: number[],
}
type Operator = '*' | '/' | '+' | '-';

function parseInstructions(input: string): Instruction[] {
    return input.trim().split('\n').map((line) => {
        const [expected, numbers] = line.split(':');
        return {
            expected: parseInt(expected), 
            numbers: numbers.trim().split(' ').map((num) => parseInt(num)),
        }
    });
}

function testOperators(instruction: Instruction): Operator[] | undefined {
    if (instruction.numbers.length == 0) {
        if (instruction.expected)
    }
}

console.log("Part 1");
const partOneResult = await part1(true);
console.log(partOneResult);

// console.log("Part 2");
// const partTwoResult = await part2();
// console.log(partTwoResult);