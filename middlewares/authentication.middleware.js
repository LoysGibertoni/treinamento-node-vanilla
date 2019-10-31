const HttpStatusCodes = require('http-status-codes');
const User = require('../models/usuario.model');

module.exports = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.sendStatus(HttpStatusCodes.UNAUTHORIZED);
    } else {
        const splitAuthorization = authorization.split(' ');
        const type = splitAuthorization.shift();
        const token = splitAuthorization.shift();
        const credentials = Buffer.from(token, 'base64').toString().split(':');

        if (type !== 'Basic') {
            return res.sendStatus(HttpStatusCodes.UNAUTHORIZED);
        }

        const user = await User.authenticate(credentials.shift(), credentials.shift());

        if (!user) {
            return res.sendStatus(HttpStatusCodes.UNAUTHORIZED);
        }

        req.user = user;

        next();
    }
};