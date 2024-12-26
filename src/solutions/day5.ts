import { readInputForDay } from '@/common/file';

export async function part1(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(5, useSampleData);
    const instructions = parseInstructions(input);
    
    const sortedUpdates = sortUpdates(instructions);

    var middleValueSum = 0;
    sortedUpdates.validUpdates
        .map((validUpdate) => getMiddleValue(validUpdate))
        .forEach((middleValue) => { middleValueSum += middleValue; });

    return middleValueSum;
}

export async function part2(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(5, useSampleData);
    const instructions = parseInstructions(input);

    const sortedUpdates = sortUpdates(instructions);
    var middleValueSum = 0;
    sortedUpdates.invalidUpdates
        .map((invalidUpdate) => fixUpdate(invalidUpdate, instructions))
        .map((validUpdate) => getMiddleValue(validUpdate))
        .forEach((middleValue) => { middleValueSum += middleValue; });

    return middleValueSum;
}

type Instructions = {
    rules: PageOrderingRules,
    pageUpdates: number[][],
}

type SortedUpdates = {
    validUpdates: number[][],
    invalidUpdates: number[][],
}

// Each rule is a map where:
// - they key is a number
// - the value is a list of numbers, where the keys in the
//   updates must be printed before each in the values
type PageOrderingRules = Map<number, number[]>

function parseInstructions(input: string): Instructions {
    const [ruleSection, updateSection] = input.split('\n\n');

    var rules: Map<number, number[]> = new Map();
    ruleSection.split('\n').forEach((rule) => {
        const [first, second] = rule.split('|').map((num) => parseInt(num));
        var ruleToAdd = rules.get(first);
        if (!ruleToAdd) {
            ruleToAdd = []
        }
        ruleToAdd.push(second);
        rules.set(first, ruleToAdd);
    });
    const updates = updateSection.split('\n').map((update) => {
        return update.split(',').map((num) => parseInt(num));
    });

    return {
        rules: rules,
        pageUpdates: updates,
    }
}

function sortUpdates(instructions: Instructions): SortedUpdates {
    var validUpdates = [];
    var invalidUpdates = [];
    for (const update of instructions.pageUpdates) {
        const [isValid] = isUpdateValid(update, instructions.rules);
        if (isValid) {
            validUpdates.push(update);
        } else {
            invalidUpdates.push(update);
        }
    }

    return {
        validUpdates: validUpdates,
        invalidUpdates: invalidUpdates,
    }
}

// Returns false, the first index where the update is invalid, and the offending rule if it's invalid,
// true otherwise.
// The offending rule is represented as the number that was printed before but should have been printed after.
function isUpdateValid(update: number[], rules: PageOrderingRules): [boolean, number, number] {
    var pagesSeen: number[] = [];
    for (var i = 0; i < update.length; i++) {
        const page = update[i];
        const rulePages = rules.get(page);
        if (rulePages) {
            for (const rulePage of rulePages) {
                if (pagesSeen.includes(rulePage)) {
                    return [false, i, rulePage];
                }
            }
        }
        pagesSeen.push(page);
    }
    return [true, -1, -1];
}

function fixUpdate(update: number[], instructions: Instructions): number[] {
    var [isNowValid, index, rule] = isUpdateValid(update, instructions.rules);
    var newUpdate = update;
    while (!isNowValid) {
        // swap the indices and try again
        const ruleIndex = update.indexOf(rule);
        [newUpdate[ruleIndex], newUpdate[index]] = [newUpdate[index], newUpdate[ruleIndex]];

        [isNowValid, index, rule] = isUpdateValid(newUpdate, instructions.rules);
    }

    return newUpdate;
}

// Returns the value in the middle of the array, rounded down
// in the case of even-lengthed arrays. [array] must be
// length > 0.
function getMiddleValue(array: number[]): number {
    const index = Math.floor(array.length / 2);
    return array[index];
}

if (import.meta.url === `file://${process.argv[1]}`) {
    console.log("Part 1");
    const partOneResult = await part1();
    console.log(partOneResult);

    console.log("Part 2");
    const partTwoResult = await part2();
    console.log(partTwoResult);
}