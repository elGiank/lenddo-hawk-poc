const unknownEventValidator = {
    isApplicable: (event) => {
        return true;
    },
    isValid (payload) {
        return false;
    }
};
module.exports = unknownEventValidator;