import * as core from "@actions/core";

// TODO:
// 1. Handle creating a single markdown file from multiple tasty-json files
//    a. Handle cases where different files have different tests (fill with dash to indicate missing?)
//       | Name | Success | z3-4.8.14 | z3-4.8.15 | z3-4.8.16 |
//       |------|---------|-----------|-----------|-----------|
//       | a    | true    | 0.5s      | 0.25s     |    -      |

export type TestResult = {
  name: string;
  success: boolean;
  failure?: string;
  description: string;
  summary: string;
  time: number;
};

export type TestResults = {
  results: TestResult[];
  time: number;
  success: boolean;
  threads: number;
  testCount: number;
};

export const timeFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 6,
  maximumFractionDigits: 6,
});

export const formatTime = (time: number): string => timeFormatter.format(time);
export const formatString = (str: string): string =>
  str.trim().replace(/\n/g, "<br />");
export const formatSuccess = (success: boolean): string =>
  success ? "✅ Pass" : "❌ Fail";
export const formatFailure = (failure: string | undefined): string =>
  failure ? failure.trim().replace(/\n/g, "<br />") : "N/A";

export function makeSummaryTable({
  time,
  success,
  threads,
  testCount,
}: TestResults): void {
  core.summary.addHeading("Summary", 3).addTable([
    [
      { data: "Success", header: true },
      { data: "Time (seconds)", header: true },
      { data: "Threads", header: true },
      { data: "Test Count", header: true },
    ],
    [
      formatSuccess(success),
      formatTime(time),
      threads.toString(),
      testCount.toString(),
    ],
  ]);
}

export function makeResultsTable(results: TestResult[]): void {
  core.summary.addHeading("Results", 3).addTable([
    [
      { data: "Name", header: true },
      { data: "Success", header: true },
      { data: "Time (seconds)", header: true },
      { data: "Summary", header: true },
      { data: "Description", header: true },
      { data: "Failure Reason", header: true },
    ],
    ...results.map(
      ({
        name,
        success,
        failure,
        description,
        summary,
        time,
      }: TestResult): string[] => [
        name,
        formatSuccess(success),
        formatTime(time),
        formatString(summary),
        formatString(description),
        formatFailure(failure),
      ],
    ),
  ]);
}

export function populate_summary(tasty_json_filepath: string): string {
  try {
    const data: string = Deno.readTextFileSync(tasty_json_filepath);

    // TODO: Should validate that the data provided to us is formatted correctly
    const testResults: TestResults = JSON.parse(data);
    makeSummaryTable(testResults);
    makeResultsTable(testResults.results);
    return core.summary.stringify();
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      error.message = `File not found: ${tasty_json_filepath}`;
    }
    throw error;
  }
}

async function run() {
  try {
    const tasty_json_filepath: string = core.getInput(
      "tasty_json_filepath",
    );
    if (tasty_json_filepath === "") {
      throw new TypeError("tasty_json_filepath is required");
    }

    const markdown_filepath: string = core.getInput(
      "markdown_filepath",
    );
    const markdownOutput: string = populate_summary(tasty_json_filepath);
    // Markdown output is optional since GitHub introduced job summaries
    if (markdown_filepath !== "") {
      await Deno.writeTextFile(markdown_filepath, markdownOutput);
    }
    return await core.summary.write({ overwrite: true });
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

await run();
