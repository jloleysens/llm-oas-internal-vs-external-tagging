// Validates all example-internal-*.json files against the OAS schema in oas-internal.yaml

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const directoryName = path.dirname(new URL(import.meta.url).pathname);

// Load and parse the OAS YAML
const oasPath = path.join(directoryName, 'oas-internal.yaml');
const oas = yaml.load(fs.readFileSync(oasPath, 'utf8'));

// Extract the request schema for /type POST
const schema = oas.components.schemas.TypeObject;

// Prepare Ajv for OpenAPI 3.0 (draft-07)
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

// Register referenced schemas
ajv.addSchema(oas.components.schemas.SnowballType, '#/components/schemas/SnowballType');
ajv.addSchema(oas.components.schemas.NumberPercentType, '#/components/schemas/NumberPercentType');
ajv.addSchema(oas.components.schemas.BitsBytesType, '#/components/schemas/BitsBytesType');
ajv.addSchema(oas.components.schemas.DurationType, '#/components/schemas/DurationType');
ajv.addSchema(oas.components.schemas.CustomType, '#/components/schemas/CustomType');

// Convert OpenAPI oneOf/discriminator to a plain JSON Schema for validation
const typeObjectSchema = JSON.parse(JSON.stringify(schema));

// Find all example-internal-*.json files
const files = fs.readdirSync(directoryName).filter(f => /^example-internal-\d+\.json$/.test(f));

let allValid = true;

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(directoryName, file), 'utf8'));
  const validate = ajv.compile(typeObjectSchema);
  const valid = validate(data);
  if (valid) {
    console.log(`${file}: VALID`);
  } else {
    allValid = false;
    console.log(`${file}: INVALID`);
    console.log(validate.errors);
  }
}

export default allValid;
