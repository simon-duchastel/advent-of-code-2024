import { readInputForDay } from '@/common/file';

export async function part1(useSampleData: boolean = false): Promise<number> {
    const input = await readInputForDay(7, useSampleData);
    const instructions = parseInstructions(input);

    const sum = instructions
        .filter((instruction) => testOperators(instruction.expected, instruction.numbers, false))
        .map((instruction) => instruction.expected)
        .reduce((sum, num) => sum + num, 0);

    return sum;
}

export async function part2(useSampleData: boolean = false): Promise<number> {
    const input = await readInputForDay(7, useSampleData);
    const instructions = parseInstructions(input);

    // allow concatenation
    const sum = instructions
        .filter((instruction) => testOperators(instruction.expected, instruction.numbers, true))
        .map((instruction) => instruction.expected)
        .reduce((sum, num) => sum + num, 0);

    return sum;
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
    allowConcatenation: boolean,
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
    const resultA = left + right
    if (testOperators(target, [resultA, ...remainingNumbers], allowConcatenation, memo)) {
        memo.set(key, true);
        return true;
    }
    // Test subtraction
    const resultS = left - right;
    if (testOperators(target, [resultS, ...remainingNumbers], allowConcatenation, memo)) {
        memo.set(key, true);
        return true;
    }
    // Test multiplication
    const resultM = left * right;
    if (testOperators(target, [resultM, ...remainingNumbers], allowConcatenation, memo)) {
        memo.set(key, true);
        return true;
    }
    // Test division (check for valid division)
    const resultD = left / right;
    if (
        right !== 0 && 
        left % right === 0 && 
        testOperators(target, [resultD, ...remainingNumbers], allowConcatenation, memo)
    ) {
        memo.set(key, true);
        return true;
    }
    // Test concatenation
    const resultC = parseInt(`${left}${right}`);
    if (
        allowConcatenation && 
        testOperators(target, [resultC, ...remainingNumbers], allowConcatenation, memo)
    ) {
        memo.set(key, true);
        return true;
    }

    memo.set(key, false);
    return false;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    console.log("Part 1");
    const partOneResult = await part1();
    console.log(partOneResult);

    console.log("Part 2");
    const partTwoResult = await part2();
    console.log(partTwoResult);
}
