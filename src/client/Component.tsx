import * as React from 'react';

export type IProps = {
  value: string;
};

export const Component = ({value}) => (
  <div>Value is: {value}</div>
);

Component.displayName = 'Component';
