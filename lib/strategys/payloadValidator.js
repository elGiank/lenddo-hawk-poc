class PayloadValidator {
    constructor(strategy) {
        this.strategy = strategy;
    }
    isApplicable (event) {
        return this.strategy.isApplicable(event);
    }
    validate (requestBody) {
        return this.strategy.validate(requestBody);
    }
}

module.exports = PayloadValidator;