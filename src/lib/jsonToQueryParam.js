

export default function jsonToQueryParam(json, defaultValue = {}) {
    json = Object.assign(defaultValue, json);
    return `${Object.keys(json).map(key =>
            `${json[key] != null ? `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}` : ''}`).join('&')}`;
}
