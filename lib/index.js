import { graphql } from 'graphql';
import Schema from './data/schema';

module.exports = (eventQuery) => {
  let {query} = eventQuery;
  let variables;
  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  if (query && query.hasOwnProperty('query')) {
    query = query.query.replace("\n", ' ', "g");
  }

  if(eventQuery && eventQuery.variables) {
    variables = JSON.parse(eventQuery.variables);
  }

  console.log('query:' + JSON.stringify(query));
  console.log('variableValues:' + JSON.stringify(variables));
  return graphql(Schema, query, null, null, variables);
};
