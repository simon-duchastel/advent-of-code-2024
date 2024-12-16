import { readInputForDay } from './common/file.js'

async function part1(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(2, useSampleData);
    const lines = input.trim().split('\n');

    var safeReports = 0;
    lines.map(line => {
        const report = line.split(/\s+/).map(Number);
        if(isReportSafe(report, false)) {
            safeReports++;
        }
    });

    return safeReports;
}

async function part2(useSampleData: Boolean = false): Promise<number> {
    const input = await readInputForDay(2, useSampleData);
    const lines = input.trim().split('\n');

    var safeReports = 0;
    lines.map(line => {
        const report = line.split(/\s+/).map(Number);
        if(isReportSafe(report, true)) {
            safeReports++;
        }
    });

    return safeReports;
}

function isReportSafe(
    report: number[], 
    useProblemDampener: Boolean, 
    hasEncounteredIssue = false, // tracks whether we've encountered an issue the problem dampener can fix
): boolean {
    // if the first is bigger than the second, the whole list should decrease
    var shouldDecrease = report[0] > report[1];
    for (var i = 1; i < report.length; i++) {
        if (shouldDecrease && report[i] >= report[i-1]) {
            // if the later one is bigger but we should decrease, it's unsafe
            if (!useProblemDampener) {
                return false;
            }
             
            // problem dampener can only fix 1 issue
            if (hasEncounteredIssue) {
                return false;
            }

            // attempt to fix the issue
            if (!hasEncounteredIssue) {
                const removeAfter = report.filter((_, index) => index !== i);
                const tryRemovingAfter = isReportSafe(removeAfter, useProblemDampener, true);
                const removeBefore = report.filter((_, index) => index !== i - 1);
                const tryRemovingBefore = isReportSafe(removeBefore, useProblemDampener, true);
                return tryRemovingBefore || tryRemovingAfter;
            } else {
                return false;
            }
        }
        if (!shouldDecrease && report[i-1] >= report[i]) {
            // if the later one is bigger but we should decrease, it's unsafe
            if (!useProblemDampener) {
                return false;
            }
             
            // problem dampener can only fix 1 issue
            if (hasEncounteredIssue) {
                return false;
            }
                
            // attempt to fix the issue
            const removeAfter = report.filter((_, index) => index !== i);
            const tryRemovingAfter = isReportSafe(removeAfter, useProblemDampener, true);
            const removeBefore = report.filter((_, index) => index !== i - 1);
            const tryRemovingBefore = isReportSafe(removeBefore, useProblemDampener, true);
            return tryRemovingBefore || tryRemovingAfter;
        }

        if (Math.abs(report[i] - report[i-1]) > 3) {
            // if the later one is bigger but we should decrease, it's unsafe
            if (!useProblemDampener) {
                return false;
            }
             
            // problem dampener can only fix 1 issue
            if (hasEncounteredIssue) {
                return false;
            }

            // attempt to fix the issue
            const removeAfter = report.filter((_, index) => index !== i);
            const tryRemovingAfter = isReportSafe(removeAfter, useProblemDampener, true);
            const removeBefore = report.filter((_, index) => index !== i - 1);
            const tryRemovingBefore = isReportSafe(removeBefore, useProblemDampener, true);
            return tryRemovingBefore || tryRemovingAfter;
        }
    }

    // if we haven't found an error yet, it's safe
    return true;
}

console.log("Part 1");
const partOneResult = await part1();
console.log(partOneResult);

console.log("Part 2");
const partTwoResult = await part2();
console.log(partTwoResult);