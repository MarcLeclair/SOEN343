import 'fetch';

const API_PORT = 8080;
const API_URL = "http://localhost";

export default function callApi(endpoint, method = 'get', body, token) {
  let headers = {
    'content-type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = token;
  }

  return fetch(`${API_URL}:${API_PORT}/${endpoint}`, {
    headers: headers,
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      json.status = response.status;
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => Promise.reject(error)
  );
}