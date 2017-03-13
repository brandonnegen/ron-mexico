/**
 * 
 * Functions to deal with cookies using expressjs
 * Why ? "Just" to improve the testability, it's too bad to use directly the req.cookies function
 * Don't forget to use the cookieParser at the top of the app
 * 
 */

/**
 * Usage : SetCookie({secure: true, cookieName: 'XSRF-TOKEN'})(expressResponse, 'hello world');
 *
 * @param {Object} options 
 */
export const SetCookie = function (options = {}) {

  const defaultOptions = {
    maxAge: 1 * 60 * 60 * 1000, // = 1 hour
    cookieName: 'emixcookie',
    secure: false, // Warning
    httpOnly: false, // Warning
  };

  const opts = Object.assign({}, defaultOptions, options);
  const { cookieName, secure, httpOnly, maxAge } = opts;
  Object.freeze(opts);

  return (response, data) => response.cookie(cookieName, data, { secure, httpOnly, maxAge });
}

export const getCookie = (request, name) => request.cookies[name] || null;

// export const getJwtCookie = getCookie.bind(null, null, 'jwt'); Bad usage of bind ! DON'T DO THAT PLEASE
export const getJwtCookie = (req) => getCookie(req, 'jwt');

/** Exemples to deal with csrf and jwt cookies in my applications */
export const setCsrfCookie = SetCookie({ name: 'XSRF-TOKEN' });

export const setJwtCookie = SetCookie({
  secure: true,
  httpOnly: true,
  cookieName: 'JWT-TOKEN',
  maxAge: 1 * 60 * 60 * 1000,
});
