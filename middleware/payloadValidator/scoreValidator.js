const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
    "properties": {
        "client_id": { "type": "string" },
        "event": { "type": "string" },
        "result": {
            "type": "object",
            "properties": {
                "score": {  "type": "string", "maxLength": 4, "minLength": 1, "pattern": "^\\d{1,4}$" }
            },
            "additionalProperties": false,
            "required": ["score"]
        }
    },
    "additionalProperties": false,
    "required": ["client_id", "event", "result"]
};

const scoreValidator = {
    isApplicable: (event) => {
        return event === 'scoring_complete';
    },
    isValid (payload) {
        return ajv.validate(schema, payload);
    }
};

module.exports = scoreValidator;