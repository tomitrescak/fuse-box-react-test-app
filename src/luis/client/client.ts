import 'tslib';
import { FuseBoxTestRunner, TestConfig } from 'fuse-test-runner';
import { render } from './luis/index';
import { Reporter } from './luis/reporter';
import { state } from './luis/state/state';

let myGlobal: any = global;
myGlobal.$_stubs_$ = {};
function proxyRequire(require, path) {
  let parts = path.split('/');
  let el = parts[parts.length - 1];
  return myGlobal.$_stubs_$[el] || require(path);
};
myGlobal.proxyRequire = proxyRequire;

myGlobal.jest = {
  mock(path, impl) {
    let parts = path.split('/');
    myGlobal.$_stubs_$[parts[parts.length - 1]] = impl();
  },
  unmock(path) {
    let parts = path.split('/');
    myGlobal.$_stubs_$[parts[parts.length - 1]] = null;
  }
};

TestConfig.snapshotDir = '';
TestConfig.snapshotExtension = 'json';
TestConfig.snapshotCalls = null;
TestConfig.snapshotLoader = (name: string, className: string) => {
  if (state.requests[className] == null) {
    state.requests[className] = {
      count: 0,
      requesting: true,
      retry: () => FuseBox.import(name)
    };
  };

  name = name.substring(name.indexOf('/tests'));
  let val = FuseBox.import(name, m => {
    state.requests[className].requesting = false;
  });
  return val;
};

import { process } from './luis/louis';
import * as BarTest from '../../client/tests/Bar.test';
import * as FooTest from '../../client/tests/Foo.test';

state.tests = process([BarTest, FooTest]);


state.runner = new FuseBoxTestRunner({ reporter: Reporter });
state.runner.startTests(state.tests);

render();
