const Config = () => {
  if (process.env.NODE_ENV === 'test') {
    // test
    return {
      restful: {
        databaseURL: process.env.REACT_APP_TEST_DATABASE_URL,
        apiKey: process.env.REACT_APP_TEST_API_KEY
      }
    }
  } else if (process.env.NODE_ENV === 'production') {
    // production
    return {
      restful: {
        databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
        apiKey: process.env.REACT_APP_PROD_API_KEY
      }
    }
  }
  // development
  return {
    restful: {
      databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
      apiKey: process.env.REACT_APP_DEV_API_KEY
    }
  }
}

const restfulApiConfig = Config().restful;
module.exports = { restfulApiConfig };