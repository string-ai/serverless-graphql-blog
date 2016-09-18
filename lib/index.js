import { graphql } from 'graphql';
import Schema from './data/schema';

module.exports = (eventQuery) => {
  /**
   * Needed function because there are some differences between the objects
   * that come from react-native and graphiql (one is a proper javascript object,
   * doesn't need any parsing - the other one is a String that needs parsing.
   *
   * @param query
   * @returns {module.exports.args.variables|{description, type}|module.exports.operations.CreateDeployment.input.members.variables|{shape}|module.exports.operations.CreateStage.input.members.variables|module.exports.shapes.S18.members.variables|*}
   */
  const getVariables = (query) => {
    try {
      return JSON.parse(query.variables);
    } catch (e) {
      return query.variables;
    }
  };

  let {query} = eventQuery;
  let variables;
  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  if (query && query.hasOwnProperty('query')) {
    query = query.query.replace("\n", ' ', "g");
  }

  if(eventQuery && eventQuery.variables) {
    variables = getVariables(eventQuery);
  }

  console.log('query:' + query);
  console.log('variableValues:' + variables);
  return graphql(Schema, query, null, null, variables);
};