
const express = require('express')
const routes = require('./router/router')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express();


const port = 3306
// 8000
//3011
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.use('/', routes)

app.get('/test', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log('port is running successfully'))

module.exports = app;
