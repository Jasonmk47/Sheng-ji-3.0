var fs = require('fs');
const schema = fs.readFileSync('./server/graphql/.graphql', 'utf8');

module.exports = schema;
