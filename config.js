require('dotenv').config();

const Config = (env) => {
  if (env === 'test') {
    // test
    return {
      restful: {
        databaseURL: process.env.TEST_DATABASE_URL,
        databaseHost: process.env.TEST_DATABASE_HOST,
        databaseUser: process.env.TEST_DATABASE_USER,
        databasePassword: process.env.TEST_DATABASE_PASSWORD,
        databaseName: process.env.TEST_DATABASE_NAME,
        apiKey: process.env.TEST_API_KEY
      }
    }
  } else if (env === 'production') {
    // production
    return {
      restful: {
        databaseURL: process.env.PROD_DATABASE_URL,
        databaseHost: process.env.PROD_DATABASE_HOST,
        databaseUser: process.env.PROD_DATABASE_USER,
        databasePassword: process.env.PROD_DATABASE_PASSWORD,
        databaseName: process.env.PROD_DATABASE_NAME,
        apiKey: process.env.PROD_API_KEY
      }
    }
  }
  // development
  return {
    restful: {
      databaseURL: process.env.DEV_DATABASE_URL,
      databaseHost: process.env.DEV_DATABASE_HOST,
      databaseUser: process.env.DEV_DATABASE_USER,
      databasePassword: process.env.DEV_DATABASE_PASSWORD,
      databaseName: process.env.DEV_DATABASE_NAME,
      apiKey: process.env.DEV_API_KEY
    }
  }
}

const restfulApiConfig = Config(production).restful;
module.exports = { restfulApiConfig };