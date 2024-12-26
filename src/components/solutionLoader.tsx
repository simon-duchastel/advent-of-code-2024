'use client';

import { getSolutionFunction } from "@/common/solutions";
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
      const solutionFunction = getSolutionFunction(day, part);

      if (solutionFunction !== undefined) {
        const result = await solutionFunction(useSampleData ?? false);
        setData(`${result}`);
      } else {
        setData(`Unable to get function day ${1} part ${1}`);
      }
    } catch (error: unknown) {
      let message: string
      if (error instanceof Error) {
        message = error.message
      }
      else {
        message = String(error)
      }

      setData(message);
    }
  };

  return <button onClick={loadSolution}>{data}</button>;
}
