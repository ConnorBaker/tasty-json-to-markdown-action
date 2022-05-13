# Markdown tables built from tasty-json

This action creates a Markdown table from the JSON output by
[tasty-json](https://github.com/larskuhtz/tasty-json) and displays it as a job
summary[^1].

It takes at least one argument, `tasty_json_filepath`, which is the path to the
JSON file produced by [tasty-json](https://github.com/larskuhtz/tasty-json).

Optionally, it takes a second argument: `markdown_filepath`, the path where
you'd like to store the produced Markdown file. This argument can be omitted, in
which case the action will only write the resulting Markdown to the job summary.

As an example of what it does, check out the sample input JSON
`./tests/resources/rest_rewrite_test_tasty.json` and the resulting Markdown
table `./tests/resources/expected.md`. You can see an example of the job summary
output by viewing the results of this action's `build-test` workflow. The data
used is from a run of the [rest](https://github.com/ConnorBaker/rest) library.

[^1]: https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/
