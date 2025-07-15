## Prompts

Generate a batch of different examples. Based on the request schemas in @oas-internal.yaml . Place each in a JSON file from 1-10. Use naming convention `example-internal-<number>.json` replacing `<number>` with the iteration of the example you are generating. Ensure that you make use of all fields of each type you generate an example for. Try to add examples of "Snowball" types often.

Generate a batch of different examples. Based on the request schemas in @oas-external.yaml . Place each in a JSON file from 1-10. Use naming convention `example-external-<number>.json` replacing `<number>` with the iteration of the example you are generating. Ensure that you make use of all fields of each type you generate an example for. Try to add examples of "Snowball" types often.

## Validate

```bash
pnpm install
pnpm validate
```