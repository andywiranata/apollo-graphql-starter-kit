// eslint-disable-next-line import/no-extraneous-dependencies
import admin from 'firebase-admin';

let instanceValue;

export default (config) => {
    const { serviceAcc, databaseUrl } = config.settings.firebase;

    if (instanceValue) {
        return instanceValue;
    }
    instanceValue = admin.initializeApp({
        credential: admin.credential.cert(serviceAcc),
        databaseURL: databaseUrl
    });
    return instanceValue;
};
