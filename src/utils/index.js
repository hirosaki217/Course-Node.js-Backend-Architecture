const _ = require('lodash');

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
};

const getSelectData = (select = []) => {
    return Object.fromEntries(select.map((el) => [el, 1]));
};

const unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map((el) => [el, 0]));
};

const removeUndefinedObject = (object) => {
    Object.keys(object).forEach((k) => {
        if (object[k] === undefined || object[k] === null) delete object[k];
    });
    return object;
};

const updateNestedObjectParser = (object) => {
    const final = {};
    Object.keys(object).forEach((k) => {
        if (typeof object[k] === 'object' && !Array.isArray(object[k])) {
            const response = updateNestedObjectParser(object[k]);
            Object.keys(response).forEach((a) => {
                final[`${k}.${a}`] = response[a];
            });
        } else {
            final[k] = object[k];
        }
    });
    return final;
};

module.exports = { getInfoData, getSelectData, unGetSelectData, removeUndefinedObject, updateNestedObjectParser };
