import React from 'react';
import { ValueHolder } from '../../../main/API/ResultHolder';

export interface LoaderProps<T> {
  loadHolder: ValueHolder<T>;
  view: (value: T) => React.Component;
}

const Loader = <T,>(props: LoaderProps<T>) => {
  return props.loadHolder.discriminator === 'loading';
  return <div></div>;
};

export default Loader;
