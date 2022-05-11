import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'
import {main} from '../src/main'
import {readFileSync} from 'fs'

test('catches missing tasty-json-output-filepath', () => {
  expect(() => main('', '')).toThrow(
    Error('tasty-json-output-filepath is required')
  )
})

test('catches missing markdown-output-filepath', () => {
  expect(() =>
    main(
      path.join(__dirname, '..', 'tests', 'rest-rewrite-test-tasty-run.json'),
      ''
    )
  ).toThrow('markdown-output-filepath is required')
})

test('catches nonexistent tasty-json-output-filepath', () => {
  expect(() => main('fakeFile.json', 'test_output.md')).toThrow(
    'tasty-json-output-filepath does not exist'
  )
})

test('matches expected output', () => {
  expect(
    main(
      path.join(__dirname, '..', 'tests', 'rest-rewrite-test-tasty-run.json'),
      path.join(
        __dirname,
        '..',
        'tests',
        'rest-rewrite-test-tasty-run-actual.md'
      )
    )
  ).toBe(
    readFileSync(
      path.join(
        __dirname,
        '..',
        'tests',
        'rest-rewrite-test-tasty-run-expected.md'
      )
    ).toString()
  )
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_TASTY-JSON-OUTPUT-FILEPATH'] = path.join(
    __dirname,
    '..',
    'tests',
    'rest-rewrite-test-tasty-run.json'
  )
  process.env['INPUT_MARKDOWN-OUTPUT-FILEPATH'] = path.join(
    __dirname,
    '..',
    'tests',
    'rest-rewrite-test-tasty-run-actual.md'
  )
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'dist', 'index.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
