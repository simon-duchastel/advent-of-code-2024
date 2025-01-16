import { readInputForDay } from '@/common/file';

export async function part1(useSampleData: boolean = false): Promise<number> {
    const input = await readInputForDay(8, useSampleData);
    const antennas = parseAntennasFromInput(input);
    const [maxX, maxY] = parseMapSizeFromInput(input);

    const antinodes: Coord[] = [];
    antennas.forEach((antenna, index) => {
        const [antennaType, antennaCoord] = antenna;
        antennas.forEach((otherAntenna, otherIndex) => {
            const [otherType, otherCoord] = otherAntenna;
            if (otherIndex > index && antennaType === otherType) {
                const [x1, y1] = antennaCoord;
                const [x2, y2] = otherCoord;

                const dx = x1 + (x1 - x2);
                const dy = (y1 - y2);

                antinodes.push([x1 + dx, y1 + dy]);
                antinodes.push([x2 - dx, y2 - dy]);
            }
        });
    });

    const inBoundsAntinodes = antinodes.filter(([x, y]) =>
         x >= 0 && y >= 0 && x <= maxX && y <= maxY
    );
    const uniqueAntinodes = filterUniqueCoords(inBoundsAntinodes);

    return uniqueAntinodes.length;
}

export async function part2(useSampleData: boolean = false): Promise<number> {
    // const input = await readInputForDay(8, useSampleData);

    // TODO

    return -1;
}

type Coord = [number, number]
type Antenna = [string, Coord]

function parseAntennasFromInput(input: string): Antenna[] {
    const coordinates: Antenna[] = [];
    input.split('\n').forEach((line, rowIndex) => {
        line.split('').forEach((char, colIndex) => {
            if (char !== '.') {
                coordinates.push([char, [rowIndex, colIndex]]);
            }
        });
    });
    return coordinates;
}

function parseMapSizeFromInput(input: string): [number, number] {
    let x: number
    let y: number
    const rows = input.split('\n');
    x = rows.length;
    y = rows[0].length;

    return [x, y]
}

function filterUniqueCoords(coords: Coord[]): Coord[] {
    const unique = new Set();

    return coords.filter(coord => {
        const key = JSON.stringify(coord);
        if (unique.has(key)) {
            return false;
        }
        unique.add(key);
        return true;
    });
}

if (import.meta.url === `file://${process.argv[1]}`) {    
    console.log("Part 1");
    const partOneResult = await part1();
    console.log(partOneResult);

    console.log("Part 2");
    const partTwoResult = await part2();
    console.log(partTwoResult);
}
