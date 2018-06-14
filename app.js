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
    console.log(`[request in] ${new Date().toLocaleString('es-pe')} ${req.hostname} ${req.originalUrl} ${req.method} ${req.status} ${req.headers} ${req.body}` );
    next();
});

// //Custom middlewares
// app.post('/lenddo', hawkMiddleware);
app.post('/lenddo', payloadValidator);


//Routes
app.use('/lenddo', lenddoRoutes);

app.use((req, res, next) => {
    console.log(`[response out] ${new Date().toLocaleString('es-pe')} ${res.hostname} ${res.status} ${res.headers} ${res.body}` );
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