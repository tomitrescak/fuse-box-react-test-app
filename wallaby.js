const transform = require("fuse-test-runner").wallabyFuseTestLoader;
const path = require('path');

module.exports = function (wallaby) {
  // var load = require;

  return {
    files: [
      "src/**/*.ts*",
      "!src/**/*.test.tsx",
      "!src/**/*.test.ts",
      "!src/**/*.d.ts*"
    ],
    tests: [
      "src/**/*.test.tsx",
      "src/**/*.test.ts",
      "src/**/snapshots/*.json",
    ],
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({ jsx: 'react', module: 'commonjs' })
    },
    preprocessors: {
      "**/*.ts": file => transform(file.content),
      "**/*.tsx": file => transform(file.content) 
    },
    env: {
      type: "node"
    },
    testFramework: "mocha"
  };
};