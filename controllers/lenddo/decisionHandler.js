const decisionHandler = (decisionData, res) => {
    res.status(200).send({decisionData: decisionData});
};

module.exports = decisionHandler;