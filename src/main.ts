import * as core from '@actions/core'
import {existsSync, readFileSync} from 'fs'
import {writeFile} from 'fs/promises'

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

export const timeFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 6,
  maximumFractionDigits: 6
})

export const formatTime = (time: number): string => timeFormatter.format(time)
export const formatString = (str: string): string =>
  str.trim().replace(/\n/g, '<br />')
export const formatSuccess = (success: boolean): string =>
  success ? 'Pass ✅' : 'Fail ❌'
export const formatFailure = (failure: string | undefined): string =>
  failure ? failure.trim().replace(/\n/g, '<br />') : 'N/A'

export function makeSummaryTable({
  time,
  success,
  threads,
  testCount
}: TestResults): void {
  core.summary.addHeading('Summary', 3).addTable([
    [
      {data: 'Success', header: true},
      {data: 'Time (seconds)', header: true},
      {data: 'Threads', header: true},
      {data: 'Test Count', header: true}
    ],
    [
      formatSuccess(success),
      formatTime(time),
      threads.toString(),
      testCount.toString()
    ]
  ])
}

export function makeResultsTable(results: TestResult[]): void {
  core.summary.addHeading('Results', 3).addTable([
    [
      {data: 'Name', header: true},
      {data: 'Success', header: true},
      {data: 'Time (seconds)', header: true},
      {data: 'Summary', header: true},
      {data: 'Description', header: true},
      {data: 'Failure Reason', header: true}
    ],
    ...results.map(
      ({
        name,
        success,
        failure,
        description,
        summary,
        time
      }: TestResult): string[] => [
        name,
        formatSuccess(success),
        formatTime(time),
        formatString(summary),
        formatString(description),
        formatFailure(failure)
      ]
    )
  ])
}

export function main(
  tastyJsonOutputFilepath: string,
  markdownOutputFilepath: string
): string {
  if (tastyJsonOutputFilepath === '') {
    throw new Error('tasty-json-output-filepath is required')
  }
  if (!existsSync(tastyJsonOutputFilepath)) {
    throw new Error('tasty-json-output-filepath does not exist')
  }
  if (markdownOutputFilepath === '') {
    throw new Error('markdown-output-filepath is required')
  }

  // TODO: Should validate that the data provided to us is formatted correctly
  const testResults: TestResults = JSON.parse(
    readFileSync(tastyJsonOutputFilepath).toString()
  )
  makeSummaryTable(testResults)
  makeResultsTable(testResults.results)
  return core.summary.stringify()
}

async function run(): Promise<void> {
  try {
    const tastyJsonOutputFilepath: string = core.getInput(
      'tasty-json-output-filepath'
    )
    const markdownOutputFilepath: string = core.getInput(
      'markdown-output-filepath'
    )
    const markdownOutput: string = main(
      tastyJsonOutputFilepath,
      markdownOutputFilepath
    )
    writeFile(markdownOutputFilepath, markdownOutput)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
