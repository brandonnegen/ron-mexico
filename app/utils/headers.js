/**
 * 
 * Functions to deal with headers
 * 
 */

// req.headers.name or req.get('name') ??? http://expressjs.com/en/api.html#req.get
export const getHeader = (req, name) => req.headers[name];

export const getCsrfHeader = (req) => getHeader(req, 'X-XSRF-TOKEN');
