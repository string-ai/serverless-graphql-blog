# Parking Race - Graphql serverless

## How To install

1 - clone the repo

2 - cd to the cloned repo, and run npm install -g serverless, 
serverless-webpack, webpack

3 - Add the AWS secrets and keys to your environment variables

## How to run locally

Run the following command:

`serverless webpack serve --port <the port you want it to run>`

This command will run a webpack with the serverless cloudformation
configuration on the defined port.

## How to deploy into AWS

Run the following command on the CLI:
`serverless deploy`
  
This will deploy the code into the stage: dev and region: us-east-1
If you want to deploy to other regions, please configure appropriately
the file serverless.yml.

## How to extend the backend

1 - Create more lambda functions

2 - Create more json files

3 - Create more GraphQL Types for the Schema

## TODO
1 - Create cloudformation configuration to initialize with CloudWatch 
logging correctly

2 - Configure DynamoDB to work properly

3 - Add unit tests for being able to fix graphql schema configurations
quickly