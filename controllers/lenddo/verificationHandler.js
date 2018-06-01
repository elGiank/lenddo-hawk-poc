const verificationHandler = (verificationData, res) => {
    res.status(200).send({verificationData: verificationData});
};

module.exports = verificationHandler;