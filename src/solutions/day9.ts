import { readInputForDay } from '@/common/file';

export async function part1(useSampleData: boolean = false): Promise<number> {
    const input = await readInputForDay(9, useSampleData);
    
    return -1;
}

export async function part2(useSampleData: boolean = false): Promise<number> {
    const input = await readInputForDay(9, useSampleData);

    return -1;
}

if (import.meta.url === `file://${process.argv[1]}`) {    
    console.log("Part 1");
    const partOneResult = await part1();
    console.log(partOneResult);

    console.log("Part 2");
    const partTwoResult = await part2();
    console.log(partTwoResult);
}
