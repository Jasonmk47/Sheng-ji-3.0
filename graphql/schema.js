var fs = require('fs');
const schema = fs.readFileSync('./graphql/.graphql', 'utf8');

module.exports = schema;
