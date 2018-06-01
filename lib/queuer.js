const Queuer = function (strategy) {
    this.strategy = strategy;
};

Queuer.prototype = {
    isApplicable (event) {
        return this.strategy.isApplicable(event);
    },
    queue (data) {
        return this.strategy.queue(data);
    }
};

module.exports = Queuer;