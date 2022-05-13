import { populate_summary } from "../src/mod.ts";
import { assert, assertEquals, assertThrows } from "std/testing/asserts";

const test_resources_dir = "./tests/resources";

Deno.test("catches nonexistent tasty_json_filepath", () => {
  const tasty_json_filepath = `${test_resources_dir}/nonexistent.json`;
  assertThrows(
    () => populate_summary(tasty_json_filepath),
    Deno.errors.NotFound,
    `File not found: ${tasty_json_filepath}`,
  );
});

Deno.test("matches expected output", () => {
  const tasty_json_filepath =
    `${test_resources_dir}/rest_rewrite_test_tasty.json`;
  const actual: string = populate_summary(tasty_json_filepath);
  const expected = Deno.readTextFileSync(`${test_resources_dir}/expected.md`);
  assertEquals(actual, expected);
});

// shows how the runner will run a javascript action with env / stdout protocol
Deno.test("test runs", () => {
  const env = {
    "INPUT_TASTY_JSON_FILEPATH":
      `${test_resources_dir}/rest_rewrite_test_tasty.json`,
    "INPUT_MARKDOWN_FILEPATH": `${test_resources_dir}/expected.md`,
    "GITHUB_STEP_SUMMARY": `${test_resources_dir}/step_summary.md`,
    // TODO: Is it necessary to set this variable?
    "SUMMARY_ENV_VAR": "GITHUB_STEP_SUMMARY",
  };

  // const entry_file = "./dist/mod.mjs";
  const entry_file = "./dist/mod.mjs";
  const { status, stdout, stderr } = Deno.spawnSync("deno", {
    args: [
      "--unstable",
      "run",
      "--no-check",
      "--allow-env",
      `--allow-read=${test_resources_dir}`,
      `--allow-write=${test_resources_dir}`,
      entry_file,
    ],
    env: env,
  });

  const stdoutStr = new TextDecoder().decode(stdout);
  const stderrStr = new TextDecoder().decode(stderr);
  assert(
    status.success === true && stdoutStr === "" && stderrStr === "",
    `script was not successful.
  exit code: ${status.code}
  stdout: ${stdoutStr}
  stderr: ${stderrStr}`,
  );

  const actual = Deno.readTextFileSync(`${test_resources_dir}/step_summary.md`);
  const expected = Deno.readTextFileSync(`${test_resources_dir}/expected.md`);
  assertEquals(
    actual,
    expected,
    "GitHub job summary did not match expected output.",
  );
});
