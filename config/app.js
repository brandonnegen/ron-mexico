require('dotenv').config();

const appConfig = {

  /*
  |--------------------------------------------------------------------------
  | Application Environment
  |--------------------------------------------------------------------------
  |
  | This value determines the "environment" your application is currently
  | running in. This may determine how you prefer to configure various
  | services your application utilizes. Set this in your ".env" file.
  |
  */
  env: process.env.APP_ENV || 'prod',

  uri: process.env.APP_URI,

  port: process.env.APP_PORT || '3002',

  httpsPort: process.env.APP_HTTPS_PORT,

  domainName: process.env.APP_DOMAIN_NAME,
  
};

export default appConfig;