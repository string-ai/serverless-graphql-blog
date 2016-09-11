'use strict';

// Your first function handler
// module.exports.hello = (event, context, cb) => cb(null,
//   { message: 'Go Serverless v1.0! Your function executed successfully!', event }
// );

// You can add more handlers here, and reference them in serverless.yml
// import graphql from './blog/graphql/handler';
//
// export default { graphql };
'use strict';

/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */
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
