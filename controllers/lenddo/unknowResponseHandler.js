const unknowResponseHandler = {
    isApplicable: (event) => {
        return true;
    },
    queue: (data) => {
        return false;
    }
};

module.exports = unknowResponseHandler;