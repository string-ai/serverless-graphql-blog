/**
 * Created by rn1466 on 16/09/16.
 */
const getBabelRelayPlugin = require('babel-relay-plugin');
const schema = require('../lib/data/schema.json');

module.exports = getBabelRelayPlugin(schema.data);
