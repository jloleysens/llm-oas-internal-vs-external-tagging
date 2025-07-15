// validate.js
// Validates all example-internal-*.json files against the OAS schema in oas-internal.yaml

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Load and parse the OAS YAML
const oasPath = path.join(__dirname, 'oas-internal.yaml');
const oas = yaml.load(fs.readFileSync(oasPath, 'utf8'));

// Extract the request schema for /type POST
const schema = oas.components.schemas.TypeObject;

// Prepare Ajv for OpenAPI 3.0 (draft-07)
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

// Register referenced schemas
ajv.addSchema(oas.components.schemas.SnowballType, 'SnowballType');
ajv.addSchema(oas.components.schemas.NumberPercentType, 'NumberPercentType');
ajv.addSchema(oas.components.schemas.BitsBytesType, 'BitsBytesType');
ajv.addSchema(oas.components.schemas.DurationType, 'DurationType');
ajv.addSchema(oas.components.schemas.CustomType, 'CustomType');

// Convert OpenAPI oneOf/discriminator to a plain JSON Schema for validation
const typeObjectSchema = JSON.parse(JSON.stringify(schema));

// Find all example-internal-*.json files
const files = fs.readdirSync(__dirname).filter(f => /^example-internal-\d+\.json$/.test(f));

let allValid = true;

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf8'));
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

if (allValid) {
  console.log('All examples are valid!');
  process.exit(0);
} else {
  console.log('Some examples are invalid.');
  process.exit(1);
}
