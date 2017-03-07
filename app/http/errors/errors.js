export function BadCsrfError (message) {
  this.name = 'BadCsrfError';
  this.message = message;
  this.stack = (new Error()).stack;
}
BadCsrfError.prototype = Object.create(Error.prototype);
BadCsrfError.prototype.constructor = BadCsrfError;

