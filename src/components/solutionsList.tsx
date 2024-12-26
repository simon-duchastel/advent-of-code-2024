import fs from 'fs';
import { Fragment } from "react";
import SolutionLoader from "./solutionLoader";
import path from 'path';

export default async function SolutionsList() {
  const numberOfDays = await getNumberOfDays();
  return (
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      {Array.from({ length: numberOfDays }, (_, dayIndex) => (
        <Fragment key={dayIndex}>
          <li>
            Day {dayIndex + 1} Part 1: <SolutionLoader day={dayIndex + 1} part={1} />
          </li>
          <li>
            Day {dayIndex + 1} Part 2: <SolutionLoader day={dayIndex + 1} part={2} />
          </li>
        </Fragment>
      ))}
    </ol>
  );
}

// get the number of days based on the files in the `solutions` directory
export function getNumberOfDays(): number {
  const solutionsDir = path.join(process.cwd(), 'src/solutions');
  const files = fs.readdirSync(solutionsDir);
  const dayFiles = files.filter(file => file.startsWith('day') && file.endsWith('.ts'));
  return dayFiles.length;
}
