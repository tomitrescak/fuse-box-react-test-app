function wallabyFuseTestLoader(content, name) {
  var classReg = /export\s+class\s+(\w+Test)/g;
  name = name || '.';

  var matches = classReg.exec(content);

  if (matches) {
    content += `
const TestConfig = require('fuse-test-runner').TestConfig;
function __runTests(test, className) {
  for (let method in test) {
    if (typeof test[method] === 'function' && method.match(/${name}/)) {
      it(method, function () {
        TestConfig.currentTask = {
          className,
          title: method
        }
        TestConfig.snapshotCalls = null;
        test[method]();
      });
    }
  }
} 

`;
    while (matches) {
      content += `__runTests(new ${matches[1]}(), '${matches[1]}');\n`;
      matches = classReg.exec(content);
    }
  }
  
  return content;
}

module.exports = {
  wallabyFuseTestLoader
}