import winston from 'winston';

/**
 * 
 * Custom loggin levels, default = = npm = { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
 * 
 */

const levels = {
  security: 0, // security issue, if a user try to bypass the csrf tokens...
  error: 1,
  warn: 2,
  info: 3,
  verbose: 4,
  debug: 5,
};

export const levelNumberToString = function (number) {
  const levelNames = Object.keys(levels);

  for (let levelName of levelNames) {
    if (levels[levelName] === number) return levelName;
  }
}

/**
 * 
 * Create your instance of winston
 * 
 */
const path = 'storage/logs';
const logger = new (winston.Logger)({
  levels,
  transports: [
    new (winston.transports.File)({
      name: 'security',
      filename: `${path}/security-issue.log`,
      level: 'security'
    }),
    new (winston.transports.File)({
      name: 'info',
      filename: `${path}/info.log`,
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error',
      filename: `${path}/error.log`,
      level: 'error'
    }),
    new (winston.transports.File)({
      name: 'warn',
      filename: `${path}/warn.log`,
      level: 'warn'
    }),
    new (winston.transports.Console)({
      name: 'debug',
      level: 'debug'
    }),
  ]
});

/**
 * Why this doesn't work?...
 */
winston.addColors({
  trace: 'magenta',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  debug: 'blue',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  error: 'red',
  security: 'red',
});

/**
 * 
 * Development logger : we can show good info on what happened into the terminal
 * 
 */
if (process.APP_ENV == 'dev') {
  logger.configure({
    level: 'debug',
    transports: [
      new (winston.transports.Console)()
    ]
  });
}

export default logger;
