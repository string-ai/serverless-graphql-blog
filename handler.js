'use strict';

// You can add more handlers here, and reference them in serverless.yml
// Require Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var gql = require('./lib');

// Lambda Handler
export const graphql = (event, context, cb) => {
    console.log('event:' + JSON.stringify(event));
    return gql(event.body)
        .then((response) => cb(null, response))
        .catch((error) => cb(error));
};
