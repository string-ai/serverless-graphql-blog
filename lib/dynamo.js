import Promise from 'bluebird';
import AWS from 'aws-sdk';
const dynamoConfig = {
  sessionToken:    process.env.AWS_SESSION_TOKEN,
  region:          process.env.AWS_REGION
};

const docClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);
const stage = process.env.SERVERLESS_STAGE || 'dev';
const projectName = process.env.SERVERLESS_PROJECT || 'string-ai-serverless-graphql-blog';
const postsTable = projectName + '-posts-' + stage;
const authorsTable = projectName + '-authors-' + stage;
const commentsTable = projectName + '-comments-' + stage;
console.log('stage:' + stage);
console.log('project:' + projectName);
console.log('postsTable:' + postsTable);
console.log('authorsTable:' + authorsTable);
console.log('commentsTable:' + commentsTable);

export function createPost(post) {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: postsTable,
      Item: post
    };

    docClient.put(params, (err, data) => {
      if (err) {
        console.log('Error in creating a post:' + err);
        return reject(err);
      }
      console.log('post:' + JSON.stringify(post));
      console.log('data:' + data);
      return resolve(post);
    });

  });
}

export function getPosts() {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: postsTable,
      AttributesToGet: [
        'id',
        'title',
        'author',
        'bodyContent'
      ]
    };

    docClient.scan(params, (err, data) => {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });

  });
}

export function getAuthor(id) {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: authorsTable,
      Key: {
        id: id
      },
      AttributesToGet: [
        'id',
        'name'
      ]
    };

    docClient.get(params, (err, data) => {
      if (err) return reject(err);
      return resolve(data["Item"]);
    });

  });
}

export function getAuthors() {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: authorsTable,
      AttributesToGet: [
        'id',
        'name'
      ]
    };

    docClient.scan(params, (err, data) => {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });

  });
}

export function getComments() {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: commentsTable,
      AttributesToGet: [
        'id',
        'content',
        'author'
      ]
    };

    docClient.scan(params, (err, data) => {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });

  });
}
