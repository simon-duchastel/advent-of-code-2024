import { readInputForDay } from '@/common/file';

export async function part1(useSampleData: boolean = false): Promise<number> {
    const input = await readInputForDay(2, useSampleData);
    const lines = input.trim().split('\n');

    let safeReports = 0;
    lines.map(line => {
        const report = line.split(/\s+/).map(Number);
        const [isSafe] = isReportSafe(report)
        if (isSafe) {
            safeReports++;
        }
    });

    return safeReports;
}

export async function part2(useSampleData: boolean = false): Promise<number> {
    const input = await readInputForDay(2, useSampleData);
    const lines = input.trim().split('\n');

    let safeReports = 0;
    lines.map(line => {
        const report = line.split(/\s+/).map(Number);
        const [isSafe, problemIndex] = isReportSafe(report);
        if (isSafe) {
            safeReports++;
        } else {
            const lowerBound = Math.max(problemIndex - 2, 0);
            const upperBound = Math.min(problemIndex + 2, report.length);
            for (let i = lowerBound; i < upperBound; i++) {
                const reportWithRemoval = report.filter((_, index) => index !== i);
                const [isSafeWithRemoval] = isReportSafe(reportWithRemoval);
                if (isSafeWithRemoval) {
                    safeReports++;
                    break;
                }
            }
        }
    });

    return safeReports;
}

// Returns false and the index of the offending number if the result is unsafe,
// true otherwise.
function isReportSafe(report: number[]): [boolean, number] {
    // if the first is bigger than the second, the whole list should decrease
    const shouldDecrease = report[0] > report[1];
    for (let i = 1; i < report.length; i++) {
        if (shouldDecrease && report[i] >= report[i-1]) {
            return [false, i];
        }
        if (!shouldDecrease && report[i-1] >= report[i]) {
            // if the later one is bigger but we should decrease, it's unsafe
            return [false, i];
        }
        if (Math.abs(report[i] - report[i-1]) > 3) {
            // if the later one is bigger but we should decrease, it's unsafe
            return [false, i];
        }
    }

    // if we haven't found an error yet, it's safe
    return [true, -1];
}

if (import.meta.url === `file://${process.argv[1]}`) {
    console.log("Part 1");
    const partOneResult = await part1();
    console.log(partOneResult);

    console.log("Part 2");
    const partTwoResult = await part2();
    console.log(partTwoResult);
}
