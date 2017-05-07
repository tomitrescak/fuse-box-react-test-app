import * as BarTest from './tests/Bar.test';
import * as FooTest from './tests/Foo.test';
import * as ComponentsTest from './tests/Component.test';

import { startTests, render } from 'luis';

startTests([BarTest, FooTest, ComponentsTest]);
render();
