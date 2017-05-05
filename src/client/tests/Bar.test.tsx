import * as React from 'react';

import { should, TestConfig } from 'fuse-test-runner';
import { Bar } from '../Bar';

TestConfig.snapshotDir = 'src/tests/snapshots';
TestConfig.snapshotExtension = 'json';

export class BarTest {
  static story = 'My Story';
  static folder = 'Test';

  static component = () => (
    <div>Bim Bam</div>
  );

  'Should be okay'() {
    should(Bar).beOkay().beObject();
  }

  'Should construct Bar Object'() {
    // should(new Bar())
    //     .beObject()
    //     .mutate((bar: Bar) => bar.name)
    //     .equal("I am bar")
    should(1).matchSnapshot();
    should(12).matchSnapshot();
  }
}


