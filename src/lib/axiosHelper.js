/* eslint-disable no-underscore-dangle */
import axios from 'axios';

export const fetchAPI = (url, queryParam = '', token) =>
     axios({
         method: 'GET',
         headers: {
             'Content-Type': 'application/json',
             Authorization: token,
         },
         url: `${url}?${queryParam}`,
     }).then(checkStatus);

export const fetchDeleteAPI = (url, queryParam = '', token) =>
     axios({
         method: 'DELETE',
         headers: {
             'Content-Type': 'application/json',
             Authorization: token,
         },
         url: `${url}?${queryParam}`,
     }).then(checkStatus);

export const fetchPostAPI = (url, payload, token) =>
  axios({
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
      },
      data: payload,
      url,
  }).then(checkStatus);
export const fetchPostMultipartAPI = (url, form, token) =>
  axios({
      method: 'POST',
      headers: {
          'content-type': `multipart/form-data; boundary=${form._boundary}`,
          Authorization: token,
      },
      data: form,
      url,
  }).then(checkStatus);
export const fetchPutMultipartAPI = (url, form, token) =>
  axios({
      method: 'PUT',
      headers: {
          'content-type': `multipart/form-data; boundary=${form._boundary}`,
          Authorization: token,
      },
      data: form,
      url,
  }).then(checkStatus);
export const fetchPutAPI = (url, payload, token) =>
  axios({
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token
      },
      data: payload,
      url,
  }).then(checkStatus);


export const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        if (response.data.isSuccess != null) {
            const { isSuccess, data, error } = response.data;
            if (isSuccess) {
                return Promise.resolve(data, response.status);
            }
            return Promise.reject(error, response.status);
        }
        const { result: { isSuccess, data, error } } = response.data;
        if (isSuccess) {
            return Promise.resolve(data, response.status);
        }
        return Promise.reject(error, response.status);
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);

};

