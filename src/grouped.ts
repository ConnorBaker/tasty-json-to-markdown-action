import * as core from "@actions/core";
import * as path from "std/path";
import * as fs from "std/fs";
import * as octicons from "@primer/octicons";

export type Meta = { [_: string]: string };
export type FailureReason =
  | { tag: "TestFailed"; content: true }
  | { tag: "TestThrewException"; content: string }
  | { tag: "TestTimedOut"; content: number }
  | { tag: "TestDepFailed"; content: true };
export type Outcome = { tag: "Success" } | {
  tag: "FailureReason";
  content: FailureReason;
};
export type Result = {
  tag: "Result";
  resultOutcome: Outcome;
  resultDescription: string;
  resultShortDescription: string;
  resultTime: number;
};
export type JSONResult = {
  tag: "JSONResult";
  testPath: string[];
  result: Result;
};
export type Results = {
  results: JSONResult[];
  time: number;
  success: boolean;
  threads: number;
  testCount: number;
  meta: Meta;
};

const isSuccess = (result: Result): boolean =>
  result.resultOutcome.tag === "Success";

const readResultsFiles = (filePathGlob: string): Results[] =>
  [...fs.expandGlobSync(filePathGlob)].map(
    ({ path }) => JSON.parse(Deno.readTextFileSync(path)),
  );

const arraysEqual = <A>(a: A[], b: A[]): boolean =>
  a.length === b.length && a.every((aElem, i) => aElem === b[i]);

const getTestName = ({ testPath }: JSONResult): string =>
  testPath.at(-1)!;

const getTestNames = (results: JSONResult[]): string[] => results.map(getTestName);

const getGroupName = ({ testPath }: JSONResult): string[] => testPath.slice(0, -1);

const getGroupNames = (results: JSONResult[]): string[][] => results.reduce((acc, result) => {
  const newGroup = getGroupName(result);
  if (acc.every((group) => !arraysEqual(group, newGroup))) {
    acc.push(newGroup);
  }
  return acc;
}, [] as string[][]);

const getGroupNamesByDepth = (results: JSONResult[], depth: number): string[][] => results.reduce((acc, result) => {
  let newGroup = getGroupName(result);
  const newGroupDepth = Math.min(newGroup.length, depth);
  newGroup = getGroupName(result).slice(0, newGroupDepth);
  if (acc.every((group) => !arraysEqual(group, newGroup))) {
    acc.push(newGroup);
  }
  return acc;
}, [] as string[][]);


const getByPrefix = (prefix: string[], results: JSONResult[]): JSONResult[] =>
  results.filter(({ testPath }) =>
    arraysEqual(testPath.slice(0, prefix.length), prefix)
  );

// function threeDeep(results: JSONResult[]): JSONResult[] {
//   const groups = getGroupNames(results);
//   const groupResults: JSONResult[] = [];

// }


const getMetaPartitions = (metas: Meta[], fields: string[]) => {
  const partitions = new Map<string, Set<string>>();
  metas.flatMap(Object.entries).forEach(([key, value]) => {
    if (fields.includes(key)) {
      if (!partitions.has(key)) {
        partitions.set(key, new Set());
      }
      partitions.get(key)!.add(value);
    }
  })
  return partitions;
}

const makeTable = (results: { jsonResult: JSONResult, meta: Meta }[]) => {
  // We call this function when we've already got all the things grouped that we care about
  // and we just want to print the results present in a single table.
  // octicon octicon-check-circle-fill color-fg-success
  
  const iconMap = octicons as unknown as Record<string, string | octicons.Icon>;
  const defaultIcons  = iconMap["default"] as unknown as Record<string, octicons.Icon>;
  
  // color: #1a7f37
  // const successIcon = defaultIcons['check-circle-fill'].toSVG({height: 16}).replace('<svg version="1.1"', '<svg version="1.1" style="color: #1a7f37"');
  // console.log(successIcon);

  // core.summary.addHeading("Success icon")
  const successIcon = '<img src="y.svg">';

  
  // color: #cf222e
  // const failureIcon = defaultIcons['x-circle-fill'].toSVG({height: 16}).replace('<svg version="1.1"', '<svg version="1.1" style="color: #cf222e"');
  // console.log(failureIcon);

  // core.summary.addHeading("Failure icon")
  const failureIcon = '<img src="n.svg">';


  const rowCreator = (result: JSONResult, meta: Meta): string[] => {
    const ret = [];
    ret.push(isSuccess(result.result) ? successIcon : failureIcon);
    ret.push(getTestName(result));
    ret.push(result.result.resultTime.toFixed(6));
    ret.push(isSuccess(result.result) ? "" : result.result.resultDescription);
    return ret;
  }

  const res = results.map((result) => rowCreator(result.jsonResult, result.meta)).sort();

  const tableHeaders = [
    { data: "Success", header: true },
    { data: "Name", header: true },
    { data: "Time (seconds)", header: true },
    { data: "Failure", header: true },
  ]

  core.summary.addTable([
    tableHeaders,
    ...res
  ]);
}

const ress = readResultsFiles("./tests/resources/test-results/**/*.json");
const f = ress.flatMap(({ results, meta }) => results.map((jsonResult) => ({ jsonResult, meta })));
makeTable(f);
// const testGroupss = getGroupNamesByDepth(f.map(({ jsonResult }) => jsonResult), 3);

// for (const testGroups of testGroupss) {
//   const testGroupName = testGroups.join(".");
//   core.summary.addHeading(testGroupName);
//   const results = ress.flatMap(({ results, meta }) => getByPrefix(testGroups, results).map((jsonResult) => { return { jsonResult, meta } }));
//   makeTable(results);
// }

const encoder = new TextEncoder();
Deno.writeFileSync(`grouped.html`, encoder.encode(core.summary.stringify()));

// console.log(testGroups);
// f(ress);
// for (const res of ress) {
//   console.log("Group names");
//   getGroupNames(res.results).forEach((group) => console.log(group.join("/")));
//   console.log("Test names");
//   getTestNames(res.results).forEach((test) => console.log(test));
//   console.log("Blah")
//   console.log(getByPrefix(["Tests", "Implementation Tests", "KBO Implementation Tests", "Arithmetic Tests"], res.results));
//   break;
// new Array(3).map((_, i) => i).forEach(i => {
//   console.log(`Depth ${i}`)
//   console.log(getGroupsAtDepth(res.results, i));
// });
// }
