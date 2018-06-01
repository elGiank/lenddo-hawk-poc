const unknowRequestHandler = {
    isApplicable: (event) => {
        return true;
    },
    queue: (data) => {
        return false;
    }
};

module.exports = unknowRequestHandler;