import { parse } from 'path';
import { readInputForDay } from './common/file.js'

async function part1(sample: Boolean = false): Promise<number> {
    const input = await readInputForDay(1, sample);
    var [leftList, rightList] = parseLists(input);

    // sort the lists and sum the difference between each item
    leftList = leftList.sort();
    rightList = rightList.sort();
    const length = Math.min(leftList.length, rightList.length);
    const distances = Array.from({ length }, (_, i) => Math.abs(leftList[i] - rightList[i]));
    const totalDistance = distances.reduce((acc, curr) => acc + curr, 0);

    return totalDistance;
}

function part2() {
    console.log("Part 2");
}

function parseLists(input: string): [number[], number[]] {
    const lines = input.trim().split('\n');
    const leftList: number[] = [];
    const rightList: number[] = [];

    lines.forEach(line => {
        const [left, right] = line.split(/\s+/).map(Number);
        leftList.push(left);
        rightList.push(right);
    });

    return [leftList, rightList ];
};

console.log("Part 1");
const partOneResult = await part1();
console.log(partOneResult);

// console.log("Part 2");
// const partTwoResult = part2(true);
// console.log(partTwoResult)