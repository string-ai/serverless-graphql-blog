import fs from 'fs';
import path from 'path';
import {graphql}  from 'graphql';
import {introspectionQuery, printSchema} from 'graphql/utilities';

// Assume your schema is in ../data/schema
import {schema} from '../lib/data/schema';
const yourSchemaPath = path.join(__dirname, '../lib/data/schema');

// Save JSON of full schema introspection for Babel Relay Plugin to use
graphql(schema, introspectionQuery).then(result => {
    fs.writeFileSync(
        `${yourSchemaPath}.json`,
        JSON.stringify(result, null, 2)
    );
});

// Save user readable type system shorthand of schema
fs.writeFileSync(
    `${yourSchemaPath}.graphql`,
    printSchema(schema)
);