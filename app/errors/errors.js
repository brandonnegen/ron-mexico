/** Custom errors */
export default function EmixError (name, payload, level) {
  this.name = name || 'EmixError';
  this.payload = payload;
  this.stack = (new Error()).stack;

  if (!level) {
    switch (name) {
      case 'BadCsrfError':
        this.level = 0; // security issue
        break;
      default :
        this.level = 1; // 1 = error, check the logger.js ;-)
    }
  } else {
    this.level = level;
  }
};
