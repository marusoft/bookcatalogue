import Helper from '../Utilities/utils';

/**
 * @class UserAuthentication
 * @description Authenticates a given user
 * @exports UserAuthentication
 */
class UserAuthentication {
  /**
    * verifyAuthHeader
    * @method verifyAuthHeader
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing success message
    * @param {object} next
    * @memberof UserAuthentication
    */
  static verifyAuthHeader(req) {
    if (!req.headers.authorization) {
      return { error: 'auth' };
    }
    const token = req.headers.authorization.split(' ')[1];
    const payload = Helper.verifyToken(token);

    if (!payload) {
      return { error: 'token' };
    }
    return payload;
  }

  /**
    * verifyUserToken
    * @method verifyUserToken
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing success message
    * @param {object} next
    * @memberof UserAuthentication
    */
  static verifyUserToken(req, res, next) {
    const payload = UserAuthentication.verifyAuthHeader(req);
    let error;
    let status;

    if (payload && payload.error === 'auth') {
      status = 401;
      error = 'No authorization header was specified';
    } else if (payload && payload.error === 'token') {
      status = 401;
      error = 'The provided token cannot be authenticated.';
    }

    if (error) {
      return res.status(status).json({ status, error });
    }
    req.user = payload;
    next();
  }

}

export default UserAuthentication;