const express = require('express');
const bodyParser = require('body-parser');
const deviceRoute = require('./routes/device.route');
const languageMiddleware = require('./middlewares/language.middleware');
const authenticationMiddleware = require('./middlewares/authentication.middleware');
const app = express();
require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(languageMiddleware);
app.use(authenticationMiddleware);

app.use(deviceRoute);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
