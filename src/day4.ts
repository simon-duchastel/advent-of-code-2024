import { readInputForDay } from './common/file.js'

async function part1(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(4, useSampleData);

    return -1;
}

async function part2(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(4, useSampleData);
    
    return -1;
}

console.log("Part 1");
const partOneResult = await part1(true);
console.log(partOneResult);

// console.log("Part 2");
// const partTwoResult = await part2();
// console.log(partTwoResult);