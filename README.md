# React Native REST Client

[![npm version](https://badge.fury.io/js/react-native-rest-client.svg)](https://badge.fury.io/js/react-native-rest-client)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

Simplify the RESTful calls of your React Native app.

## Instalation

```
npm install --save react-native-rest-client
```

## Simple usage

Create your own api client by extending the RestClient class

```javascript
import RestClient from 'react-native-rest-client';

export default class YourRestApi extends RestClient {
  constructor () {
    // Initialize with your base URL
    super('https://api.myawesomeservice.com');
  }
  // Now you can write your own methods easily
  login (username, password) {
    // Returns a Promise with the response.
    return this.POST('/auth', { username, password });
  }
  getCurrentUser () {
    // If the request is successful, you can return the expected object
    // instead of the whole response.
    return this.GET('/auth')
      .then(response => response.user);
  }
};
```

Then you can use your custom client like this

```javascript
const api = new YourRestApi();
api.login('johndoe', 'p4$$w0rd')
  .then(response => response.token)   // Successfully logged in
  .then(token => saveToken(token))    // Remember your credentials
  .catch(err => alert(err.message));  // Catch any error
```

## Advanced usage

```javascript
import RestClient from 'react-native-rest-client';

export default class YourRestApi extends RestClient {
  constructor (authToken) {
    super('https://api.myawesomeservice.com', {
      headers: {
        // Include as many custom headers as you need
        Authorization: `JWT ${authToken}`
        // Content-Type: application/json
        // and
        // Accept: application/json
        // are added by default
      },
      // Simulate a slow connection on development by adding
      // a 2 second delay before each request.
      devMode: __DEV_,
      simulatedDelay: 2000
    });
  }
  getWeather (date) {
    // Send the url query as an object
    return this.GET('/weather', { date })
      .then(response => response.data);
  }
  checkIn (lat, lon) {
    return this.POST('/checkin', { lat, lon });
  }
};
```

## Reference

### super(_baseUrl_ [, _options_])

You _must_ call the parent constructor as shown in the example above.

| Parameter   |  Type  | Required |  Default  |
|:------------|:------:|:--------:|:---------:|
| **baseUrl** | String |    Yes   | undefined |
| **options** | Object |    No    |     {}    |

#### options object

Supports the following values

|       Key          |   Type  | Required | Default |                                                                                                                                           Comments                                                                                                                                          |
|:-------------------|:-------:|:--------:|:-------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **headers**        | String  |    No    |    {}   | Headers to be appended to the request. RestApi will always include `Content-Type: application/json` and `Accept: application/json`.                                                                                                                                                         |
| **devMode**        | Boolean |    No    |  false  | When true, it enables the simulatedDelay.
| **simulatedDelay** | Number  |    No    |    0    | Useful for simulating a slow connection. Number of milliseconds to wait before making the request. NOTE: It will only take effect if devMode is true.

### this.GET(route [, query])
### this.POST(route [, body])
### this.PUT(route [, body])
### this.DELETE(route [, query])

Each one of these methods returns a Promise with the response as the parameter.

|  Parameter |  Type  | Required | Default |                            Comments                            |
|:-----------|:------:|:--------:|:-------:|:---------------------------------------------------------------|
| **route**  | String |    Yes   |    ''   | Partial route to be appended to the baseUrl                    |
| **query**  | Object |    No    |    {}   | Object to be encoded and appended as the query part to the URL |
| **body**   | Object |    No    |    {}   | Data to be sent as the JSON body of the message                |

## Limitations

* This library only supports JSON request and response bodies. If the response is not
a JSON object, it will throw a JSON parse error.
* It is labeled as _React Native_, even when it has no RN dependencies and could (in theory)
be used in any JavaScript project. The reason behind this is that the stack used (ES6 and
`fetch`) comes out of the box with React Native, and
adding support for more platforms would require to add pre-compilers, polyfills and other
tricks, which are completely out of the scope of this library. If you know what you're
doing though, feel free to tweak your stack and use this library.

## License

MIT