const toResObj = ({ res, result, error }) => {
    if (error != null) {
        res.status(500).send(error);
    } else {
        res.status(200).json({
            result
        });
    }
};

const getError = ({ error }) => {
    if (error) {
        if (error.errors && error.errors[0]) {
            const errMessage = error.errors[0].message;
            return { isSuccess: false, error: errMessage };
        }
    }
    return { isSuccess: false, error };
};

const getSuccess = ({ data }) => {
    if (data) {
        return { isSuccess: true, data };
    }
    return { isSuccess: true };
};

const getSuccessWithError = ({ error }) => {
    if (error) {
        return { isSuccess: true, error };
    }
    return { isSuccess: true };
};

const getSuccessWithWarn = ({ warn }) => {
    if (warn) {
        return { isSuccess: true, warn };
    }
    return { isSuccess: true };
};


module.exports.setResponse = toResObj;
module.exports.getError = getError;
module.exports.getSuccessWithError = getSuccessWithError;
module.exports.getSuccessWithWarn = getSuccessWithWarn;
module.exports.getSuccess = getSuccess;

