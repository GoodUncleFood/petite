# Petite

> Petite is designed to power a single RESTful JSON microservice, running on a single port. Petite services are presumed to be running behind an external router/reverse-proxy (in their own container, but as part of a larger set of API services). As such, each service only processes a single route, and allows you to define a single controller for each HTTP method accessible on that route. Petite is developed and maintained by [Good Uncle](http://gooduncle.com).

[![Build Status](https://travis-ci.org/GoodUncleFood/petite.svg?branch=master)](https://travis-ci.org/GoodUncleFood/petite)
[![Dependency Status](https://gemnasium.com/GoodUncleFood/petite.svg)](https://gemnasium.com/GoodUncleFood/petite)
[![Coverage Status](https://coveralls.io/repos/github/GoodUncleFood/petite/badge.svg?branch=master)](https://coveralls.io/github/GoodUncleFood/petite?branch=master)

## Install

```bash
npm install petite
```

-----

## Usage

### Require the module

```js
const Petite = require('petite');
```

### Create a new microservice

```js
var petite = new Petite();
```

### Set url requirements for incoming requests

```js
petite.requiredUrl('myservice')
petite.disallowedUrl('myservice/*');
```

### Set header requirements

```js
petite.requiredHeader('accept','json');
petite.requiredHeader('client-id','*');
petite.requiredHeader('accept-encoding','gzip');
```

### Add controllers

```js
petite.addController('POST', myPostController);
petite.addController('GET', myGetController);
petite.addController('PUT', myPutController);
petite.addController('DELETE', myDeleteController);
```

### Define the default configuration

```js
petite.defaultConfig({
  'port' : 3000,
  'foo' : 'bar'
});
```

### Add environment-specific configuration.
#### These inherit all default configs, but those can be overriden.

```js
petite.envConfig('staging',{
  'port' : 80
});

petite.envConfig('production',{
  'port' : 443
});
```

### Start the service

```js
petite.start();
```


-----



## How it Works

This is what happens when a request comes in to your Petite microservice.

### Step 1: URI validation
The requested uri is checked against the required and disallowed uris you set with the requiredUrl() and disallowedUrl() functions. A 404 is returned if this check fails.

### Step 2: Header validation
The headers sent with the request are checked against the required headers you define with the requiredHeader() function. A 406 is returned if this check fails.

### Step 3: Routing to controllers
With the addController() function, you define which controller should receive the request data for each http method (POST, GET, PUT, DELETE, etc). If a request is received via a method that has no matching controller (OPTIONS or HEAD for example), a 405 is returned. If there is a matching controller for that method, that controller is passed a single data object and a callback. 



-----



## Setting up Your Controllers
Your controllers should be normal functions that accept two parameters: a data object, and a callback.

### The data object
The data object contains all the request data you should need to process the request.

```js
{
  'path' : 'the/requested/path',
  'pathArray' :,['the','requested','path'],
  'params' : {'foo' : 'bar'},
  'payload' : {'fizz' : 'buzz'},
  'headers' : {'accept-encoding' : 'gzip'}
}
```

* **data.path**: The requested path received by the service, after the leading and trailing slashes have been trimmed. If the root was requested, the path will be null.
* **data.pathArray**: An array containing the data.path after is has been split/exploded by slashes. If the data.path contained no slashes, the array will contain one string. If the data.path was null, the array will be empty.
* **data.params**: An object containing key-value pairs of the url parameters sent with the request (from the request string)
* **data.payload**: An object containing the payload sent. If the payload was not included or was not valid JSON, data.payload will be an empty object.
* **data.headers**: An object containg key-value pairs of the headers sent with the request. All headers and header-values are expressed in lowercase.

### Accessing config data

The current config data that Petite is running under can be accessed at petite.config.

The petite.defaultConfig() and petite.envConfig() functions (detailed above) allow you to set default and environment-specific configuration variables. When your node application is started, Petite will check the NODE_ENV variable for an environment name. If you have set a configuration object for that environment, then petite.config will inherit that environment's config object. If no configuration object has been set for that environment, then the default configuration object will be used instead.

### Calling back

After processing the data passed to it, your controller should callback two things: an HTTP status code (a 3 digit number), and (optionally) a payload object. The status code and payload that your controllers call back will be returned by the microservice. If your controller throws an exception, a 500 error will be returned by the service.

```js
  callback(200, {'foo':'bar'});
```

### Full example

```js
var myPostController = function(data, callback){

  // Get the payload data
  var requestPayload = data.payload;
  
  // Get the config data for this environment
  var configData = petite.config;
  
  // Throw an error if needed (which will make the microservice return a 500)
  if(typeof(configData.foo) == 'undefined'){
    throw('Foo was not defined in this environment');
  } else {
    // Return a status code and a payload
    var responsePayload = {'foo':'bar'};
    var statusCode = 200;
    callback(statusCode, responsePayload);
  }
});
```



-----




## Deploying

Petite services are designed to run in standalone containers, behind an external reverse-proxy or router (which sends requests to the container only when requests are received with matching paths). Dockerizing a Petite service is as simple as including a Dockerfile like so:

```
# Use the Node 4.0 docker image
FROM node:4-onbuild

# Expose ports needed by the environments
EXPOSE  80
EXPOSE  443
EXPOSE  3000
```

# License

The MIT License (MIT)

Copyright (c) 2016 Rosco & Benedetto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.







