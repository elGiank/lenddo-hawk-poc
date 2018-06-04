const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
    "properties": {
        "client_id": {"type": "string"},
        "event": {"type": "string"},
        "result": {"type": "object"}
    },
    "additionalProperties": false,
    "required": ["client_id", "event", "result"]
};

const featuresValidator = {
    isApplicable: (event) => {
        return event === 'application_features_complete';
    },
    isValid(payload) {
        return ajv.validate(schema, payload);
    }
};


module.exports = featuresValidator;