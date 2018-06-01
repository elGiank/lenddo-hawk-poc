const scoreHandler = (req, res) => {
    res.status(200).send('Score handler locked and loaded');
};

module.exports = scoreHandler;