const multipleVerificationHandler = (multipleVerificationData, res) => {
    res.status(200).send({multipleVerificationData: multipleVerificationData});
};

module.exports = multipleVerificationHandler;