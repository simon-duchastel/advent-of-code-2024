import { readInputForDay } from '@/common/file';

export async function part1(useSampleData: boolean = false): Promise<number> {
    const input = await readInputForDay(6, useSampleData);
    const map = parseMap(input);
    const { visitedPositions } = predictGuardRoute(map);
    
    return visitedPositions.uniquePositionsSize();
}

export async function part2(useSampleData: boolean = false): Promise<number> {
    const input = await readInputForDay(6, useSampleData);
    const map = parseMap(input);
    
    // check all positions where obstacles could be placed
    const viableObstacles: Position[] = [];
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === '.') {
                // temporarily place the obstacle and check if the guard loops
                const newMap = map.map(row => row.slice()); // Create a deep copy
                newMap[row][col] = '#';
                const { hasLoop } = predictGuardRoute(newMap, new UniquePositionsSet());

                if (hasLoop) {
                    viableObstacles.push([row, col]);
                }
            }
        }
    }

    return viableObstacles.length;
}

// The map, where
// - '.' represents empty space
// - '^', '>', 'v', '<' represents the guard
// - '#' represents an obstacle
type Map = string[][];
type Position = [number, number];

// A set for storing positions and directions
class UniquePositionsSet {
    private set: Set<string>;

    constructor() {
        this.set = new Set();
    }

    // Add a position and direction to the set
    addPosition(row: number, col: number, direction: string) {
        const positionKey = `${row},${col}-${direction}`;
        this.set.add(positionKey);
    }

    // Check if a position (ignoring direction) has been visited
    hasPosition(row: number, col: number, direction: string): boolean {
        const positionKey = `${row},${col}-${direction}`;
        return this.set.has(positionKey);
    }

    // Return the size of the set (number of unique pos/dir pairs)
    size(): number {
        return this.set.size;
    }

    // Return the size of unique positions (ignoring direction)
    uniquePositionsSize(): number {
        const uniquePositions = new Set();
        for (const key of this.set) {
            const [position] = key.split('-');
            uniquePositions.add(position);
        }
        return uniquePositions.size;
    }
}

function parseMap(input: string): Map {
    return input.split('\n').map((line) => line.split(''));
}

// Return the guard's route, including whether it's stuck in a loop.
function predictGuardRoute(
    map: Map,
    visitedPositions: UniquePositionsSet = new UniquePositionsSet(),
): { visitedPositions: UniquePositionsSet, hasLoop: boolean } {
    const [rowBound, colBound] = [map.length, map[0].length];
    let guard: Position = findObject(['^', '>', 'v', '<'], map);
    const directions: string[] = ['^', '>', 'v', '<']; // rotation order
    let direction = map[guard[0]][guard[1]];
    const deltas: { [key: string]: [number, number] } = {
        '^': [-1, 0],
        '>': [0, 1],
        'v': [1, 0],
        '<': [0, -1],
    };

    // Track positions and directions (row, col, direction)
    visitedPositions.addPosition(guard[0], guard[1], direction);
    
    while (true) {
        let [row, col] = guard;
        const [dRow, dCol] = deltas[direction];
        row += dRow;
        col += dCol;

        // Check if the guard is out of bounds
        if (row < 0 || row >= rowBound || col < 0 || col >= colBound) {
            return { visitedPositions, hasLoop: false };
        }

        // Check if the guard hits an obstacle
        if (map[row][col] === '#') {
            const currentDirectionIndex = directions.indexOf(direction);
            direction = directions[(currentDirectionIndex + 1) % 4];
            continue;
        }

        // Check if the guard has revisited the same position
        if (visitedPositions.hasPosition(row, col, direction)) {
            return { visitedPositions, hasLoop: true };
        }

        // Add new position and direction to the visited set
        visitedPositions.addPosition(row, col, direction);
        guard = [row, col];
    }
}

// Returns the first position for a given object(s), or throw if not found
function findObject(object: string[], map: Map): Position {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (object.includes(map[row][col])) {
                return [row, col]; // return the position as [row, col]
            }
        }
    }
    throw new Error('Object not found');
}

if (import.meta.url === `file://${process.argv[1]}`) {
    console.log("Part 1");
    const partOneResult = await part1();
    console.log(partOneResult);

    console.log("Part 2");
    const partTwoResult = await part2();
    console.log(partTwoResult);
}
