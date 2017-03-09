import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './app/http/routes/routes';
import { developmentErrors, productionErrors } from './app/errorsHandlers/errorsHandlers';
import getConfig from './app/getConfig';

const app = express();

/** Parse url encoded */
const parseUrlEncoded = bodyParser.urlencoded({ extended: false });
app.use(parseUrlEncoded);

/** Parse application/json */
const parseJson = bodyParser.json();
app.use(parseJson);

/** Parse cookie */
app.use(cookieParser());

/** Mount routes */
app.use('/birds', routes);

/** Error handler */
if (getConfig('app').env === 'dev') {
  /* Development Error Handler - Prints stack trace */
  app.use(developmentErrors);
} else {
  // production error handler
  app.use(productionErrors);

}


export default app;