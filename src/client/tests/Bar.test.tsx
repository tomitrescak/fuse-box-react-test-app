import * as React from 'react';

import { should } from 'fuse-test-runner';
import { Bar as BarType } from '../Bar';

import { proxy } from 'proxyrequire';


const Bar = proxy(() => require('../Bar').Bar, {
  './Zar': { StubMe: 20 }
});

export class BarTest {
  static story = 'Bar';
  static folder = 'Test';
  static component = <div>Bim Bam 6</div>;

  'Should Bar be okay'() {
    should(Bar).beOkay().beObject();
  }

  'Should construct Bar Object'() {
    should(new Bar())
      .beObject()
      .mutate((bar: BarType) => bar.name)
      .equal('I am bar 20');
    should(1).matchSnapshot();
    should(12).matchSnapshot();
  }
}

export class Bar2Test {
  static story = 'Bar 2';
  static folder = 'Test';

  static component = <div>Bim Bam 3</div>;

  'Should Bar be okay'() {
    should(Bar).beOkay().beObject();
  }

  'Should construct Bar Object'() {
    should(new Bar())
      .beObject()
      .mutate((bar: Bar) => bar.name)
      .equal('I am bar 20');
    should(1).matchSnapshot();
    should(12).matchSnapshot();
  }
}


