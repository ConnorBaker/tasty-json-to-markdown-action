import * as core from '@actions/core'
import assert from 'assert'
import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'

export type TestResult = {
  name: string
  success: boolean
  failure?: string
  description: string
  summary: string
  time: number
}

export type TestResults = {
  results: TestResult[]
  time: number
  success: boolean
  threads: number
  testCount: number
}

export const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 6,
  maximumFractionDigits: 6
});

export function makeSummaryTable(testResults: TestResults): string {
  return (
    "### Summary\n\n" +
    "| Success | Time (seconds) | Threads | Test Count |\n" +
    "| :---: | :---: | --- | --- |\n" +
    makeSummaryRow(testResults) + "\n\n"
  )
}

export function makeSummaryRow(testResults: TestResults): string {
  return (
    "| " + (testResults.success ? "✅" : "❌") +
    " | " + formatter.format(testResults.time) +
    " | " + testResults.threads +
    " | " + testResults.testCount +
    " |"
  )
}

export function makeResultsTable(testResults: TestResults): string {
  return (
    "### Results\n\n" +
    "| Name | Success | Time (seconds) | Summary | Description | Failure Reason |\n" +
    "| --- | :---: | :---: | --- | --- | --- |\n" +
    testResults.results.map((value, _1, _2) => makeResultsRow(value)).join("\n") + "\n\n"
  )
}

export function makeResultsRow(testResult: TestResult): string {
  return (
    "| " + testResult.name +
    " | " + (testResult.success ? "✅" : "❌") +
    " | " + formatter.format(testResult.time) +
    " | " + testResult.summary.trim().replace(/\n/g, "<br />") +
    " | " + testResult.description.trim().replace(/\n/g, "<br />") +
    " | " + (testResult.failure ? testResult.failure.trim().replace(/\n/g, "<br />") : "N/A") +
    " |"
  )
}

export function makeMarkdown(testResults: TestResults): string {
  return makeSummaryTable(testResults) + makeResultsTable(testResults)
}

export function main(tastyJsonOutputFilepath: string, markdownOutputFilepath: string): string {
  if (tastyJsonOutputFilepath === "") {
    throw new Error("tasty-json-output-filepath is required")
  }
  if (markdownOutputFilepath === "") {
    throw new Error("markdown-output-filepath is required")
  }
  if (! existsSync(tastyJsonOutputFilepath)) {
    throw new Error("tasty-json-output-filepath does not exist")
  }
  const testResults: TestResults = require(tastyJsonOutputFilepath)
  return makeMarkdown(testResults)
}

async function run(): Promise<void> {
  try {
    const tastyJsonOutputFilepath: string = core.getInput('tasty-json-output-filepath')
    const markdownOutputFilepath: string = core.getInput('markdown-output-filepath')
    const markdownOutput: string = main(tastyJsonOutputFilepath, markdownOutputFilepath)
    console.debug(markdownOutput)
    writeFile(markdownOutputFilepath, markdownOutput)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
