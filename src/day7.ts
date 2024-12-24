import { readInputForDay } from './common/file.js';

async function part1(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(7, useSampleData);
    const instructions = parseInstructions(input);
    const sum = instructions
        .filter((instruction) => testOperators(instruction) !== undefined)
        .flatMap((instruction) => instruction.numbers)
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
    // if there's one number left, check if we've reached the expected value
    if (instruction.numbers.length === 1) {
        if (instruction.expected !== instruction.numbers[0]) {
            // if the last value doesn't match, the operators don't work
            return undefined;
        } else {
            // if the last value matches then these operators work
            return [];
        }
    }

    // test all operations
    var operators = attemptOperator('*', instruction);
    if (operators) {
        return operators;
    }
    operators = attemptOperator('/', instruction);
    if (operators) {
        return operators;
    }
    operators = attemptOperator('+', instruction);
    if (operators) {
        return operators;
    }
    operators = attemptOperator('-', instruction);
    if (operators) {
        return operators;
    }
}

function attemptOperator(operator: Operator, instruction: Instruction): Operator[] | undefined {
    var updatedInstruction = copyInstruction(instruction);

    switch (operator) {
        case '*': updatedInstruction.expected /= instruction.numbers[0]
        case '/': updatedInstruction.expected *= instruction.numbers[0];
        case '+': updatedInstruction.expected -= instruction.numbers[0]
        case '-': updatedInstruction.expected += instruction.numbers[0];
    }
    updatedInstruction.numbers.splice(0);

    var operatorsToReturn = testOperators(instruction);
    if (operatorsToReturn) {
        operatorsToReturn.push(operator);
    }
    return operatorsToReturn
}

function copyInstruction(instruction: Instruction): Instruction {
    return {
        expected: instruction.expected,
        numbers: instruction.numbers.slice(),
    }
}

console.log("Part 1");
const partOneResult = await part1(true);
console.log(partOneResult);

// console.log("Part 2");
// const partTwoResult = await part2();
// console.log(partTwoResult);