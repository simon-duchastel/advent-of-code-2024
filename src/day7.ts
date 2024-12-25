import { readInputForDay } from './common/file.js';

async function part1(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(7, useSampleData);
    const instructions = parseInstructions(input);

    const sum = instructions
        .filter((instruction) => testOperators(instruction.expected, instruction.numbers))
        .map((instruction) => instruction.expected)
        .reduce((sum, num) => sum + num, 0);

    return sum;
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

function parseInstructions(input: string): Instruction[] {
    return input.trim().split('\n').map((line) => {
        const [expected, numbers] = line.split(':');
        return {
            expected: parseInt(expected),
            numbers: numbers.trim().split(' ').map((num) => parseInt(num)),
        }
    });
}

function testOperators(
    target: number, 
    numbers: number[], 
    memo = new Map<string, boolean>(),
): boolean {
    const key = `${target}:${numbers.join(',')}`;
    if (memo.has(key)) return memo.get(key)!;

    if (numbers.length === 1) {
        const isMatch = numbers[0] === target;
        memo.set(key, isMatch);
        return isMatch;
    }

    const left = numbers[0];
    const right = numbers[1];
    const remainingNumbers = [...numbers.slice(2)];

    // Test addition
    if (testOperators(target, [left + right, ...remainingNumbers], memo)) {
        memo.set(key, true);
        return true;
    }
    // Test subtraction
    if (testOperators(target, [left - right, ...remainingNumbers], memo)) {
        memo.set(key, true);
        return true;
    }
    // Test multiplication
    if (testOperators(target, [left * right, ...remainingNumbers], memo)) {
        memo.set(key, true);
        return true;
    }
    // Test division (check for valid division)
    if (right !== 0 && left % right === 0 && testOperators(target, [left / right, ...remainingNumbers], memo)) {
        memo.set(key, true);
        return true;
    }

    memo.set(key, false);
    return false;
}

console.log("Part 1");
const partOneResult = await part1();
console.log(partOneResult);

// console.log("Part 2");
// const partTwoResult = await part2();
// console.log(partTwoResult);