import { graphql } from 'graphql';
import Schema from './schema';

module.exports = (query) => {
  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  if (query && query.hasOwnProperty('query')) {
    query = query.query.replace("\n", ' ', "g");
  }

  return graphql(Schema, query);
};
// export function runGraphQL(event, cb) {
//
//   console.log('Events:' + JSON.stringify(event));
//   let query = event.query;
//
//   // patch to allow queries from GraphiQL
//   // like the initial introspectionQuery
//   if (event.query && event.query.hasOwnProperty('query')) {
//     query = event.query.query.replace("\n", ' ', "g");
//   }
//
//   return graphql(Schema, query).then( (result) => {
//     console.log('RESULT: ', result);
//     return cb(null, result);
//   }).catch();
//
// }
