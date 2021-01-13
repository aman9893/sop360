
const express = require('express')
const routes = require('./router/router')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express();


const port = 8000
// 8000
//3011
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const swaggerDefinition = {
  info: {
    title: 'Test Development',
    version: '1.0.0',
    description: 'A sample API',
  },
  host: "localhost:8000",
  // localhost:8000
  // localhost:3011
  // host: "ec2-18-216-154-83.us-east-2.compute.amazonaws.com:3011",
  basePath: '/',
};

const options = {
  swaggerDefinition: swaggerDefinition,
  explorer: true,
  apis: ['./router/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', routes)

app.get('/', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log('port is running successfully'))

module.exports = app;
