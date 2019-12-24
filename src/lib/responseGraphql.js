import _ from 'lodash';

const convertToFlatObject = (data) => {
    const omits = [];
    _.forIn(data, (val, key) => {
        if (_.isObject(val) && !_.isArray(val)) {
            Object.keys(val).map((valKey) => {
                data[`${key}${valKey.charAt(0).toUpperCase() + valKey.slice(1)}`] = val[valKey];
            });
            omits.push(key);
        }
    });
    return _.omit(data, omits);
};

const toPageable = (
    { queryParam, page, limit, data = [], isConvertToFlatObject = true, total }) => {
    limit = limit || data.length;
    page = page || 1;
    total = total || data.length;
    const multiplyLimitPage = limit * page;
    const hasNextPage = total > multiplyLimitPage;
    const hasPrevPage = page > 1;
    return {
        page,
        limit,
        size: data.length,
        list: isConvertToFlatObject ? data.map(value => convertToFlatObject(value)) : data,
        queryParam,
        hasNextPage,
        hasPrevPage
    };
};

const toResponseMutation = ({
    isSuccess, success, error = null, warning = null, data = null }, options = {}) => ({
        ...options,
        isSuccess: isSuccess || success,
        data,
        error: error != null ? error.toString() : null,
        warning: warning != null ? warning.toString() : null
    });

const extractDataFromResponse = (response = {}) => {
    let result = null;
    if (response.result) {
        result = response.result;
    } else {
        result = response;
    }
    const { isSuccess, success, data, error } = result;
    if (error) {
        throw new Error(error);
    }
    if (isSuccess || success) {
        return data;
    }
    return result;

};

module.exports.toPageable = toPageable;
module.exports.toResponseMutation = toResponseMutation;
module.exports.convertToFlatObject = convertToFlatObject;
module.exports.extractDataFromResponse = extractDataFromResponse;
