import { part1 as day1part1 } from "@/solutions/day1";
import { part2 as day1part2 } from "@/solutions/day1";
import { part1 as day2part1 } from "@/solutions/day2";
import { part2 as day2part2 } from "@/solutions/day2";
import { part1 as day3part1 } from "@/solutions/day3";
import { part2 as day3part2 } from "@/solutions/day3";
import { part1 as day4part1 } from "@/solutions/day4";
import { part2 as day4part2 } from "@/solutions/day4";
import { part1 as day5part1 } from "@/solutions/day5";
import { part2 as day5part2 } from "@/solutions/day5";
import { part1 as day6part1 } from "@/solutions/day6";
import { part2 as day6part2 } from "@/solutions/day6";
import { part1 as day7part1 } from "@/solutions/day7";
import { part2 as day7part2 } from "@/solutions/day7";

export type SolutionFunction = (useSampleData: boolean) => Promise<number>
type SolutionFunctionsMap = { [key: string]: SolutionFunction }

// lookup a solution function dynamically
export function getSolutionFunction(day: number, part: number): SolutionFunction | undefined {
    return solutionFunctions[`${day}:${part}`];
}

const solutionFunctions: SolutionFunctionsMap = {
    "1:1": day1part1,
    "1:2": day1part2,
    "2:1": day2part1,
    "2:2": day2part2,
    "3:1": day3part1,
    "3:2": day3part2,
    "4:1": day4part1,
    "4:2": day4part2,
    "5:1": day5part1,
    "5:2": day5part2,
    "6:1": day6part1,
    "6:2": day6part2,
    "7:1": day7part1,
    "7:2": day7part2,
}