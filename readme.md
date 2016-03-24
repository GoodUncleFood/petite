# Petite

> A micro-services toolkit for node.js. Spin up a single RESTful microservice with ease. 

[ ![Codeship Status for GoodUncleFood/petite](https://codeship.com/projects/b0e551e0-d427-0133-7a36-1e4d5c815c8f/status?branch=master)](https://codeship.com/projects/142366)

## Install

```
npm install petite
```

## Usage

### Require the module

```
const Petite = require('petite');

```

### Create a new microservice

```
var petite = new Petite();
```

### Set url requirements for incoming requests

```
petite.requiredUrl('myservice')
petite.disallowedUrl('myservice/*');
```

### Set header requirements

```
petite.requiredHeader('accept','json');
petite.requiredHeader('client-id','*');
petite.requiredHeader('accept-encoding','gzip');
```

### Add controllers

```
petite.addController('POST', myPostController);
petite.addController('GET', myGetController);
petite.addController('PUT', myPutController);
petite.addController('DELETE', myDeleteController);
```

### Define the default configuration

```
petite.defaultConfig({
	'port' : 3000,
	'foo' : 'bar'
});
```

### Add environment-specific configuration.
#### These inherit all default configs, but those can be overriden.

```
petite.envConfig('staging',{
	'port' : 80
});

petite.envConfig('production',{
	'port' : 443
});

```
### Start the service
```
petite.start();
```

## How it Works

This is what happens when a request comes in to your Petite microservice.

### Step 1: URI validation
The requested uri is checked against the required and disallowed uris you set with the requiredUrl() and disallowedUrl() functions. A 404 is returned if this check fails.

### Step 2: Header validation
The headers sent with the request are checked against the required headers you define with the requiredHeader() function. A 406 is returned if this check fails.

### Step 3: Routing to controllers
With the addController() function, you define which controller should receive the request data for each http method (POST, GET, PUT, DELETE, etc). If a request is received via a method that has no matching controller (OPTIONS or HEAD for example), a 405 is returned. If there is a matching controller for that method, that controller is passed a single data object and a callback 

```
yourController(data, callback)
```

The data object contains all the request data you should need to process the request.

```
{
	'path' : 'the/requested/path',
	'pathArray' :,['the','requested','path'],
	'params' : {'foo' : 'bar'},
	'payload' : {'fizz : 'buzz'},
	'headers' : {'accept-encoding' : 'gzip'}
}
```

* **data.path**: The requested path received by the service, after the leading and trailing slashes have been trimmed. If the root was requested, the path will be null.
* **data.pathArray**: An array containing the data.path after is has been split/exploded by slashes. If the data.path contained no slashes, the array will contain one string. If the data.path was null, the array will be empty.
* **data.params**: An object containing key-value pairs of the url parameters sent with the request (from the request string)
* **data.payload**: An object containing the payload sent. If the payload was not included or was not valid JSON, data.payload will be an empty object.
* **data.headers**: An object containg key-value pairs of the headers sent with the request. All headers and header-values are expressed in lowercase.



## Setting up Your Controllers
Your controllers should be normal functions that accept two parameters: a data object (as detailed above), and a callback.

After processing the data passed to it, your controller should return two things: an HTTP status code (a 3 digit number), and (optionally) a payload object that should be returned to the requester.

```
var myPostController = function(data, callback){

	// Process the data here
	var statusCode = 200;
	var payload = {'foo':'bar'};
	
	// Callback
	callback(statusCode, payload);

});
```

The status code and payload that your controllers callback will be returned by the API. If your controller throws an exception, a 500 error will be returned by the API.



