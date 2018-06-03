const unknowRequestHandler = {
    isApplicable: (event) => {
        return true;
    },
    queue: (data) => {
        return new Promise((resolve) => {
            resolve(false);
        });
    }
};

module.exports = unknowRequestHandler;