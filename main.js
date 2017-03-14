import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './app/http/routes/routes';
import { developmentErrors, productionErrors, testErrors, joiValidationErrors, mongoValidationErrors } from './app/errorsHandler/errorsHandler';
import getConfig from './app/getConfig';
import chalk from 'chalk';

const app = express();
const appConfig = getConfig('app');

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

/**
 * After adding the routes, adding the errorHandler middleware
 */

/**
 * One of our error handlers will see if these errors are just validation errors
 */
app.use(joiValidationErrors);
app.use(mongoValidationErrors);

switch (appConfig.env) {
  case 'dev': 
    /* Development Error Handler - Prints stack trace */
    console.log(chalk.cyan('App use the developmentErrorsHandler'));
    app.use(developmentErrors);
    break;
  
  case 'prod':
    console.log(chalk.cyan('App use the productionErrorsHandler'));
    app.use(productionErrors);
    break;
  
  case 'test': 
    console.log(chalk.cyan('App use the testErrorsHandler'));
    app.use(testErrors);
}

export default app;