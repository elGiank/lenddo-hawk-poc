class Queuer  {
    constructor(strategy) {
        this.strategy = strategy;
    }
    isApplicable (event) {
        return this.strategy.isApplicable(event);
    }
    queue (data) {
        return this.strategy.queue(data);
    }
}

module.exports = Queuer;