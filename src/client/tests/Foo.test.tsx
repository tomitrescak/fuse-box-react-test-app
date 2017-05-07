import { should } from 'fuse-test-runner';
import { Foo } from '../Foo';
import * as React from 'react';

export class FooTest {
    static story = 'My Story 2';
    static folder = 'Test/Me';
    static component = <div>Foo</div>;

    'Should Foo be okay'() {
        should(Foo).beOkay().beObject();
    }

    'Should construct Foo Object'() {
        should(new Foo())
            .beObject()
            .mutate((bar: Foo) => bar.name)
            .equal('I am FOO');
    }
}
