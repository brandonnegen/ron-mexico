import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();

/** Parse url encoded */
const parseUrlEncoded = bodyParser.urlencoded({ extended: false });
app.use(parseUrlEncoded);

/** Parse application/json */
const parseJson = bodyParser.json();
app.use(parseJson);

/** Parse cookie */
app.use(cookieParser());

/** Import and mount routes */
import routes from './app/http/routes/routes';
app.use('/birds', routes);

export default app;