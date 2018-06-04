class PayloadValidator {
    constructor(strategy) {
        this.strategy = strategy;
    }
    isApplicable (event) {
        return this.strategy.isApplicable(event);
    }
    isValid (payload) {
        return this.strategy.isValid(payload);
    }
}

module.exports = PayloadValidator;