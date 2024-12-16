import { readInputForDay } from './common/file.js'

async function part1(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(1, useSampleData);
    var [leftList, rightList] = parseLists(input);

    // sort the lists and sum the difference between each item
    leftList = leftList.sort();
    rightList = rightList.sort();
    const length = Math.min(leftList.length, rightList.length);
    const distances = Array.from({ length }, (_, i) => Math.abs(leftList[i] - rightList[i]));
    const totalDistance = distances.reduce((acc, curr) => acc + curr, 0);

    return totalDistance;
}

async function part2(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(1, useSampleData);
    const [leftList, rightList] = parseLists(input);
    
    var similarityScore = 0;
    for (var left = 0; left < leftList.length; left++) {
        var count = 0;
        for (var right = 0; right < rightList.length; right++) {
            if (rightList[right] === leftList[left]) {
                count += 1;
            }
        }
        similarityScore += (count * leftList[left]);
    }

    return similarityScore;
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

console.log("Part 2");
const partTwoResult = await part2();
console.log(partTwoResult);