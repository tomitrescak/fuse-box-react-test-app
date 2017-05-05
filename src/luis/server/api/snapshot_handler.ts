const url = require('url');
const path = require('path');
const fs = require('fs');


const snapshots = path.resolve('./src/tests');

export function handler(request, response, next) {
  let url_parts = url.parse(request.url, true);
  let query = url_parts.query;
  const snapPath = path.join(snapshots, url_parts.path);
  // maybe replace with fs.readFileSync
  const snap = fs.readFileSync(snapPath, 'utf8');
  console.log(snap);
  // write response
  response.writeHead(200, {
    'Content-Type': 'application/json'
  });

  response.end(snap);
}
