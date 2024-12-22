import { readInputForDay } from './common/file.js';

async function part1(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(5, useSampleData);
    const instructions = parseInstructions(input);
    console.log(instructions);

    return -1;
}

async function part2(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(5, useSampleData);
    const instructions = parseInstructions(input);

    return -1;
}

type Instructions = {
    rules: PageOrderingRule[],
    pageUpdates: number[][],
}
type PageOrderingRule = [number, number]

function parseInstructions(input: string): Instructions {
    const [ruleSection, updateSection] = input.split('\n\n');

    const rules: PageOrderingRule[] = ruleSection.split('\n').map((rule) => {
        const [first, second] = rule.split('|');
        return [parseInt(first), parseInt(second)];
    });
    const updates = updateSection.split('\n').map((update) => {
        return update.split(',').map((num) => parseInt(num));
    });

    return {
        rules: rules,
        pageUpdates: updates,
    }
}

console.log("Part 1");
const partOneResult = await part1(true);
console.log(partOneResult);

// console.log("Part 2");
// const partTwoResult = await part2();
// console.log(partTwoResult);