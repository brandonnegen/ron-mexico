import logger, { levelNumberToString } from '../errorsHandlers/logger';

/**
 * 
 * Catch Errors Handler
 * With async/await, you need some way to catch errors
 * Instead of using try{} catch(e) {} in each controller, we wrap the function in
 * catchErrors(), catch and errors they throw, and pass it along to our express middleware with next()
 * 
 */
export const catchErrors = function (fn) {
  return (req, res, next) =>
    fn(req, res, next).catch(next);
};

/**
 * 
 * Development Error Hanlder
 * In development we show good error messages so if we hit a syntax error or any other previously un-handled error,
 * we can show good info on what happened
 * 
 */
export const developmentErrors = function (err, req, res, next) {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stack: err.stack,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  
  res.status(err.status || 500);
  /** Based on the `Accept` http header : http://expressjs.com/en/api.html#res.format  */
  res.format({
    // If the header is not specified, the first callback is invoked = app/json
    'application/json': () => res.json(errorDetails), // Ajax call, send JSON back
    'text/html': () => {
      // res.render('error', errorDetails);
    },
    'default': () => res.status(406).send('Not Acceptable'),
  });
};

  
/**
 * 
 * Production Error Hanlder
 * No stacktraces are leaked to user but all errors going to logger
 */
export const productionErrors = function (err, req, res, next) {

  const levelName = levelNumberToString(err.level || 1); // Just in case we forgot to pass by custom EmixError which defines the level
  
  const data = levelName === 'verbose' || levelName === 'debug'
    ? { stack: err.stack, payload: err.payload }
    : err.payload;

  console.log('level name :', levelName);

  logger.log(levelName, data);

  res.sendStatus(err.status || 500);
};
