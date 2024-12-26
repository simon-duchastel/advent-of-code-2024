'use client';

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
import { useState } from "react";

type Props = {
  day: number,
  part: number,
  useSampleData?: boolean,
}

export default function SolutionLoader({ 
  day, 
  part, 
  useSampleData,
}: Props) {
  const [data, setData] = useState("Click to load!");
  let solutionFunction: (useSampleData: boolean) => Promise<number>;

  // use JSON.stringify as a hack for equality check
  switch (JSON.stringify([day, part])) {
    case JSON.stringify([1, 1]): 
      solutionFunction = day1part1;
      break;
    case JSON.stringify([1, 2]): 
      solutionFunction = day1part2; 
      break;
    case JSON.stringify([2, 1]): 
      solutionFunction = day2part1; 
      break;
    case JSON.stringify([2, 2]): 
      solutionFunction = day2part2; 
      break;
    case JSON.stringify([3, 1]): 
      solutionFunction = day3part1; 
      break;
    case JSON.stringify([3, 2]): 
      solutionFunction = day3part2; 
      break;
    case JSON.stringify([4, 1]): 
      solutionFunction = day4part1; 
      break;
    case JSON.stringify([4, 2]): 
      solutionFunction = day4part2; 
      break;
    case JSON.stringify([5, 1]): 
      solutionFunction = day5part1; 
      break;
    case JSON.stringify([5, 2]): 
      solutionFunction = day5part2; 
      break;
    case JSON.stringify([6, 1]): 
      solutionFunction = day6part1; 
      break;
    case JSON.stringify([6, 2]): 
      solutionFunction = day6part2; 
      break;
    case JSON.stringify([7, 1]): 
      solutionFunction = day7part1; 
      break;
    case JSON.stringify([7, 2]): 
      solutionFunction = day7part2; 
      break;
    default: 
      solutionFunction = () => Promise.reject(`Solution not found for day ${day} part ${part}`);
  }

  const loadSolution = async () => {
    setData("Loading...")
    try {
      const result = await solutionFunction(useSampleData ?? false);
      setData(`${result}`);
    } catch (error) {
      console.error('Error loading solution:', error);
      setData(`${error}`);
    }
  };

  return (
    <button onClick={loadSolution}>{data}</button>
  )
}
