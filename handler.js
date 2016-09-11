'use strict';

// Your first function handler
export const hello = (event, context, cb) => cb(null,
  { message: 'Go Serverless Webpack (Babel) v1.0! Your function executed successfully!', event }
);

// You can add more handlers here, and reference them in serverless.yml
