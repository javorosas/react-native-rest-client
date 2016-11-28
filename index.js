/* globals fetch __DEV__ */

export default class RestApi {
  constructor (baseUrl = '', { headers = {}, simulatedDelay = 0 }) {
    if (!baseUrl) throw new Error('missing baseUrl');
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    Object.assign(this.headers, headers);
    this.baseUrl = baseUrl;
    this.simulatedDelay = simulatedDelay;
  }

  _simulateDelay () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, this.simulatedDelay);
    });
  }

  _fullRoute (url) {
    return `${this.baseUrl}${url}`;
  }

  _fetch (route, method, body, isQuery = false) {
    if (!route) throw new Error('Route is undefined');
    var fullRoute = this._fullRoute(route);
    if (isQuery && body) {
      var qs = require('qs');
      const query = qs.stringify(body);
      fullRoute = `${fullRoute}?${query}`;
      body = {};
    }
    const fetchPromise = () => fetch(fullRoute, { method, body: JSON.stringify(body), headers: this.headers });
    if (__DEV__) {
      // Simulate a 2 second delay in evry request
      return this._simulateDelay()
        .then(() => fetchPromise())
        .then(response => response.json());
    } else {
      return fetchPromise()
        .then(response => response.json());
    }
  }

  GET (route, query) { return this._fetch(route, 'GET', true); }
  POST (route, body) { return this._fetch(route, 'POST', body); }
  PUT (route, body) { return this._fetch(route, 'PUT', body); }
  DELETE (route, query) { return this._fetch(route, 'DELETE', query, true); }
}
