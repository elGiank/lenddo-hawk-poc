const Ajv = require('ajv');
const ajv = new Ajv();

const schema ={
    properties: {
        "client_id": { "type": "string" },
        "event": { "type": "string" },
        "result": { "type": "object"}
    },
    "additionalProperties": false,
    "required": ["client_id", "event", "result"]
};

const basePayloadValidator = (payload) => {
    return ajv.validate(schema, payload);
};

module.exports = basePayloadValidator;