## Prompts

Generate a batch of different examples. Based on the request schemas in @oas-internal.yaml . Place each in a JSON file from 1-10. Use naming convention `example-internal-<number>.json` replacing `<number>` with the iteration of the example you are generating. Ensure that you make use of all fields of each type you generate an example for. Try to add examples of "Snowball" types often.

Generate a batch of different examples. Based on the request schemas in @oas-external.yaml . Place each in a JSON file from 1-10. Use naming convention `example-external-<number>.json` replacing `<number>` with the iteration of the example you are generating. Ensure that you make use of all fields of each type you generate an example for. Try to add examples of "Snowball" types often.

## Validate

```bash
pnpm install
pnpm validate
```

## Example output

```
❯ pnpm validate

> llm-oas-test@1.0.0 validate /Users/jeanlouisleysens/repos/work/llm-oas-test
> node validate.js

example-internal-1.json: VALID
example-internal-10.json: VALID
example-internal-2.json: VALID
example-internal-3.json: VALID
example-internal-4.json: VALID
example-internal-5.json: VALID
example-internal-6.json: VALID
example-internal-7.json: VALID
example-internal-8.json: VALID
example-internal-9.json: VALID
example-external-1.json: VALID
example-external-10.json: VALID
example-external-2.json: VALID
example-external-3.json: VALID
example-external-4.json: VALID
example-external-5.json: VALID
example-external-6.json: VALID
example-external-7.json: VALID
example-external-8.json: VALID
example-external-9.json: VALID
```