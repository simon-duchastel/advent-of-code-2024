import { parse } from 'path';
import { readInputForDay } from './common/file.js'

async function part1(sample: Boolean = false) {
    const input = await readInputForDay(1, sample);
    const [leftList, rightList] = parseLists(input);

    // sort the lists and sum each summed item
    leftList.sort();
    rightList.sort();

    const length = Math.min(leftList.length, rightList.length);
    const distances = Array.from({ length }, (_, i) => leftList[i] + rightList[i]);
    const totalDistance = distances.reduce((acc, curr) => acc + curr, 0);

    console.log(totalDistance);
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

part1(true);