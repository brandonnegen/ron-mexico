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
 * MongoDB Validation Error Handler
 * Detect if there are mongodb validation errors that we can nicely return
 * 
 */

export const mongoValidationErrors = (err, req, res, next) => {

  /**
   * Duplicate key error
   * Issue : https://github.com/Automattic/mongoose/issues/2129
   */
  if (err.code === 11000) {
    const regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i;    
    const match =  err.message.match(regex);
    const indexName = match[1] || match[2];

    const error = {};
    error[indexName] = `ce champ doit être unique. Il est déjà utilisé dans notre base.`;
    return next({ message: error, status: 400 });
  }
  
  if (!err.errors) return next(err); // It's not a mongo error

  const errors = {};
  const fields = Object.keys(err.errors);

  fields.forEach(field => {
    error[field] = error[field] || {};
    error[field] = err.errors[field].message;
  });

  return next({ message: errors, status: 400 });
};

/**
 * 
 * Joi Validation Error Handler
 * Detect if there are Joi validation errors that we can nicely return
 * 
 */
export const joiValidationErrors = (err, req, res, next) => {
  const details = err.details;
  if (!details) return next(err);

  const errors = {};

  /**
   * Joi error format :
   * detail.message, detail.path
   * Documentation : https://github.com/hapijs/joi/blob/v10.2.2/API.md#errors
   */
  details.forEach(detail => {
    errors[detail.path] = detail.message;
  });

  return next({ message: errors, status: 400 });
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
  
  const levelName = levelNumberToString(err.level || 1);
  logger.log(levelName, errorDetails); // Print in the terminal
  
  return res.status(err.status || 500).json(errorDetails.message);

  /** Use the following lines if you're using express with template rendering */
  /** Based on the `Accept` http header : http://expressjs.com/en/api.html#res.format  */
  /*
  res.format({
    // If the header is not specified, the first callback is invoked = app/json
    'application/json': () => res.json(errorDetails), // Ajax call, send JSON back
    'text/html': () => {
      res.render('error', errorDetails);
    },
    'default': () => res.status(406).send('Not Acceptable'),
  }); */
};

export const testErrors = (err, req, res, next) => res.status(err.status || 500).json(err.message);
  
/**
 * 
 * Production Error Hanlder
 * No stacktraces are leaked to user but all errors going to logger
 * 
 */
export const productionErrors = function (err, req, res, next) {

  const levelName = levelNumberToString(err.level || 1);
  
  const data = levelName === 'verbose' || levelName === 'debug'
    ? { stack: err.stack, payload: err.payload }
    : err.payload;

  logger.log(levelName, data);
  return res.sendStatus(err.status || 500);
};