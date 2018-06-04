const BaseValidator = require('../../middleware/payloadValidator/basePayloadValidator');

const payloadValidator = (req, res, next) => {
    if(!BaseValidator(req.body)) res.status(400).end();
    else next();
        //Si pasa el validator principal, llamo a los otros validadores como strategia de la misma manera que antes. incluso con un unknow event por si llegan eventos raros.

};

module.exports = payloadValidator;