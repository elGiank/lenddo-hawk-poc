const express =  require('express');
const cors =  require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const payloadValidator = require('./middleware/payloadValidator/payloadValidator');
const hawkMiddleware = require('./middleware/hawk');

const app = express();
const port = process.env.PORT || 8000;

//Controllers
const lenddoRoutes = require('./controllers/lenddo/lenddo');

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use(cors());

app.use((req, res, next) => {
    console.log(`[request in] \n date: ${new Date().toLocaleString('es-pe')} \n hostname: ${req.hostname} \n original url: ${req.originalUrl} \n http verb: ${req.method} \n headers ${JSON.stringify(req.headers)} \n body: ${JSON.stringify(req.body)}` );
    next();
});

// //Custom middlewares
// app.post('/lenddo', hawkMiddleware);
app.post('/lenddo', payloadValidator);


//Routes
app.use('/lenddo', lenddoRoutes);

app.use((req, res, next) => {
    console.log(`[response out] \n ${new Date().toLocaleString('es-pe')} \n hostname: ${res.hostname} \n headers: ${JSON.stringify(req.headers)} \n body: ${JSON.stringify(req.body)}` );
    next();
});

// Handle 404 error, the last middleware.
app.use("*", (req, res) => {
    res.status(404).send('404');
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});

module.exports = app;