'use client';

import { useState } from "react";

type SolutionLoaderProps = {
  day: number,
  part: number,
  useSampleData?: boolean,
};

export default function SolutionLoader({
  day,
  part,
  useSampleData,
}: SolutionLoaderProps) {
  const [data, setData] = useState("Click to load!");

  const loadSolution = async () => {
    setData("Loading...");
    try {
      const solutionPath = `@/solutions/day${day}`;
      const solutionModule = await import(solutionPath);
      const solutionFunction: (useSampleData: boolean) => Promise<number>
        = solutionModule[`part${part}`];

      if (typeof solutionFunction !== "function") {
        throw new Error(`Solution not found for day ${day} part ${part}`);
      }

      const result = await solutionFunction(useSampleData ?? false);
      setData(`${result}`);
    } catch (error: any) {
      console.error("Error loading solution:", error);
      setData(`Error: ${error.message}`);
    }
  };

  return <button onClick={loadSolution}>{data}</button>;
}
