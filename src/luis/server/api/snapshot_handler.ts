const url = require('url');
const path = require('path');



const snapshots = path.resolve('./src/tests');

export function handler(request, response, next) {
  let url_parts = url.parse(request.url, true);
  let query = url_parts.query;

  console.log(url_parts);

  const snapPath = path.join(snapshots, url_parts.path);
  console.log(snapPath);
  // maybe replace with fs.readFileSync
  var snap = require(snapPath);

  console.log(snap);

  // write response
  response.writeHead(200, {
    'Content-Type': 'application/json'
  });

  

  response.end(JSON.stringify(snap));
}
