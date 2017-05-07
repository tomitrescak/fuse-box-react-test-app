import * as React from 'react';

import { should } from 'fuse-test-runner';
import { Component } from '../Component';

import { mount } from 'enzyme';

export class ComponentTest {
  static story = 'Default';
  static folder = 'React Component';
  static component = <Component value="MyValue" />;

  'Renders okay'() {
    should(ComponentTest.component).matchSnapshot();

    let m = mount(ComponentTest.component);
    should(m.prop('value')).equal('MyValue');
  }
}



