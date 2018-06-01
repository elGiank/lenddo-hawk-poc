const scoreHandler = (scoreData, res) => {
    res.status(200).send({scoreData: scoreData});
};

module.exports = scoreHandler;