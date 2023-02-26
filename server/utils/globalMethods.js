/* eslint no-undef: "error" */
/* eslint-env node */
const path = require('path');

const requireWrapper = (name) => {
  return require(path.dirname(__dirname) + '/' + name);
};

class ErrorBuilder {
  constructor (status = 500, mgs = '', data = {}) {
    this.message = mgs;
    this.status = status;
    this.data = data;
  }
}

global.requireWrapper = requireWrapper;
global.ErrorBuilder = ErrorBuilder;
