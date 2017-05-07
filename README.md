# Introduction

This project showcases the testing possibilities of [Luis]() and the Fuse testing framework.
The tests can be run in three different environment.

## Console

You can run your tests in console (e.g. when using CI) using the [fuse-test-runner](https://github.com/fuse-box/fuse-test-runner). To run your tests, simply type 

```
node fuse test
```. To customise your test properties, please check out the `fuse.js` file.

## Wallaby.js

You can run your tests in [wallaby.js](http://wallaby js). Wallaby.js is the leading solution for javascript and typescript testing. It allows you to automatically execute your currently modified test as well as monitor your current test coverage.

## Browser

You can run your tests in the browser environment, using the [Luis](http://github.com/tomitrescak/luis) framework and reporter. Moreover, Luis allows you to:

1. View your React components in form of component stories
2. View the snapshots and compare their content
3. Monitor and automatically execute your tests

Tu run your tests in browser using Luis please run

```
node fuse luis
```

And navigate to http://localhost:9001. Here is a screenshot from luis.
