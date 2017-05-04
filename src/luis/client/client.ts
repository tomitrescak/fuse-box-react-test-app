import 'tslib';
import { FuseBoxTestRunner, TestConfig } from 'fuse-test-runner';

var myGlobal: any = global;
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

const snapshots = {};
const requests = {};
const TestConfig = require('fuse-test-runner').TestConfig;


TestConfig.snapshotDir = '';
TestConfig.snapshotExtension = 'json';
TestConfig.snapshotCalls = null;
TestConfig.snapshotLoader = (name: string, className: string) => {
  if (requests[className] == null) {
    requests[className] = {
      count: 0,
      requesting: false,
      retry: () => FuseBox.import(name)
    }
  };

  name = name.substring(name.indexOf('/tests'));
  var val = FuseBox.import(name, m => {
    requests[className].requesting = false;
  });
  
  return val;
}


import { BarTest } from "../../client/tests/Bar.test";
import { FooTest } from "../../client/tests/Foo.test";

const tests = {
  'BarTest': { BarTest },
  'FooTest': { FooTest }
};


class Reporter {
  public initialize(tests) {

  }

  public startFile(name: string) {
    // console.log(name);
  }
  public startClass(name: string, item: any) {
    // console.log(item.title)
  }
  public endClass() {
    //$printLine();
    //$printSubCategory(item.title)
  }

  public testCase(report: any) {
    if (report.data.success) {
      console.log("SUCCESS: " + report.item.title);
      // console.log(report.item.title || report.item.method)
    } else {
      if (report.data.error.message && report.data.error.message.match(/Snapshot file/)) {
        this.waitForSnapshot(report);
      } else {
        console.log("ERROR: " + report.item.title + ": " + report.data.error.message);
      }
      // let message = report.data.error.message ? report.data.error.message : report.data.error;
      // console.log(report.item.title || report.item.method, message)
    }
  }

  public endTest(stats, took) {
    // console.log(stats, took);
  }

  private waitForSnapshot(report) {
    var className = report.item.className;
    var request = requests[className];
    if (request.requesting) {
      return;
    }
    request.requesting = true;

    if (request.count > 5) {
      // report error
      console.log("ERROR: " + report.item.title + ": " + report.data.error.message);
    }
    
    request.count++;
    setTimeout(() => {
      if (request.retry()) {
        var test = { [report.item.className]: tests[report.item.className] };
        runner.startTests(test);
      } else {
        this.waitForSnapshot(report);
      }      
    }, 200);
  }

}

var runner = new FuseBoxTestRunner({ reporter: Reporter });
runner.startTests(tests);

import { render } from './luis/index';
render();
