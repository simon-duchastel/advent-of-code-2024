
import SolutionLoader from "@/components/solutionLoader";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>Day 1 Part 1: <SolutionLoader day={1} part={1}/></li>
          <li>Day 1 Part 2: <SolutionLoader day={1} part={2}/></li>
          <li>Day 2 Part 1: <SolutionLoader day={2} part={1}/></li>
          <li>Day 2 Part 2: <SolutionLoader day={2} part={2}/></li>
          <li>Day 3 Part 1: <SolutionLoader day={3} part={1}/></li>
          <li>Day 3 Part 2: <SolutionLoader day={3} part={2}/></li>
          <li>Day 4 Part 1: <SolutionLoader day={4} part={1}/></li>
          <li>Day 4 Part 2: <SolutionLoader day={4} part={2}/></li>
          <li>Day 5 Part 1: <SolutionLoader day={5} part={1}/></li>
          <li>Day 5 Part 2: <SolutionLoader day={5} part={2}/></li>
          <li>Day 6 Part 1: <SolutionLoader day={6} part={1}/></li>
          <li>Day 6 Part 2: <SolutionLoader day={6} part={2}/></li>
          <li>Day 7 Part 1: <SolutionLoader day={7} part={1}/></li>
          <li>Day 7 Part 2: <SolutionLoader day={7} part={2}/></li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
