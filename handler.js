'use strict';

// Your first function handler
// module.exports.hello = (event, context, cb) => cb(null,
//   { message: 'Go Serverless v1.0! Your function executed successfully!', event }
// );

// You can add more handlers here, and reference them in serverless.yml
// Require Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var lib = require('./blog/lib');

// Lambda Handler
module.exports.graphql = (event, context) => {

    lib.runGraphQL(event, (error, response) => {
        return context.done(error, response);
    });
};
