import { Router } from 'express';
import httpStatus from 'http-status';
import LOG from '../lib/logger';

const LOGGER = LOG.getLogger({ fileName: 'middleware-auth' });

const res403 = (res) => {
    res.status(httpStatus.FORBIDDEN);
    res.json({
        status: httpStatus.FORBIDDEN,
        message: 'Invalid or expired access token'
    });
};

export default ({ firebaseInstance }) => {
    const routes = Router();
    // add middleware here
    routes.all('/graphql', [(req, res, next) => {
        const authorization = req.headers.authorization;
        LOGGER.info('checking authorization...');
        if (!authorization) {
            // res401(res);
            LOGGER.info('checking authorization, no token found, it is only for demo purpose!!!!');
            next();
        } else {
            LOGGER.info('checking authorization, use token...');
            firebaseInstance
                .auth()
                .verifyIdToken(authorization)
                .then((user) => {
                    req.headers.whoami = {
                        name: user.name,
                        userId: user.user_id,
                        provider: user.firebase.sign_in_provider
                    };
                    next();
                }).catch((error) => {
                    LOGGER.warn('get token failed - ERROR ', error.message);
                    res403(res);
                });
        }
    }]);

    return routes;
};
