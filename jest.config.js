module.exports = {
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',  // Ensures JS and JSX files are transformed using Babel
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'  // Mocks CSS imports
    },
    testEnvironment: 'jsdom',  // Specifies the environment in which the tests are run
  };
  