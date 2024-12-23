import { readInputForDay } from './common/file.js';

async function part1(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(6, useSampleData);
    const map = parseMap(input);
    const route = predictGuardRoute(map);

    // sets don't handle reference types correctly, so use JSON.stringify as
    // a hack to get string representations, which are handled
    var routeSet = new Set();
    route.forEach((pos) => routeSet.add(JSON.stringify(pos)));

    return routeSet.size;
}

async function part2(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(5, useSampleData);

    return -1;
}

// The map, where
// - '.' represents empty space
// - '^', '>', 'v', '<' represents the guard
// - '#' represents an obstacle
type Map = string[][]

type Position = [number, number]
type Route = Position[] // position as [row, col]

function parseMap(input: string): Map {
    return input.split('\n').map((line) => line.split(''));
}

function predictGuardRoute(map: Map): Route {
    var newMap = map; // create mutable copy
    const [rowBound, colBound] = [map.length, map[0].length]
    var guard: Position = findObject(['^', '>', 'v', '<'], map);
    var route: Route = [guard]; // first position in the route is the guard
    
    var direction = map[guard[0]][guard[1]];
    var directions: string[] = ['^', '>', 'v', '<']; // rotation order
    var deltas: { [key: string]: [number, number] } = {
        '^': [-1, 0],
        '>': [0, 1],
        'v': [1, 0],
        '<': [0, -1],
    };

    // simulate the guard's movements
    while (true) {
        let [row, col] = guard;
        let [dRow, dCol] = deltas[direction];
        row += dRow;
        col += dCol;

        // check if the guard is out of bounds
        if (row < 0 || row >= rowBound || col < 0 || col >= colBound) {
            break;
        }

        // check if the guard hits an obstacle
        if (map[row][col] === '#') {
            let currentDirectionIndex = directions.indexOf(direction);
            direction = directions[(currentDirectionIndex + 1) % 4];
            continue;
        }

        // no obstacles, so add this position to the route
        route.push([row, col]);
        guard = [row, col];
    }

    return route;
}

// Returns the first position for a given object(s), or null if not found
function findObject(object: string[], map: Map): Position {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (object.includes(map[row][col])) {
                return [row, col]; // Return the position as [row, col]
            }
        }
    }
    throw new Error('Object not found');
}

console.log("Part 1");
const partOneResult = await part1();
console.log(partOneResult);

// console.log("Part 2");
// const partTwoResult = await part2();
// console.log(partTwoResult);