const featuresHandler = (featuresData, res) => {
    res.status(200).send({featuresData: featuresData});
};

module.exports = featuresHandler;