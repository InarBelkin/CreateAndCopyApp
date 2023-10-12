import { observer } from 'mobx-react-lite';
import React, { ReactNode } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { ValueHolder } from '../../../main/API/ResultHolder';
import s from './Loader.module.sass';

export interface LoaderProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  state: ValueHolder<T>;
  view: (value: T) => ReactNode;
}

const Loader = observer(
  <T,>({ state, view, className, ...divProps }: LoaderProps<T>) => {
    switch (state.discriminator) {
      case 'loading':
        return (
          <div className={s.wrapper} {...divProps}>
            {state.value != null && (
              <div className={[s.contentContainer, className].join(' ')}>
                {view(state.value)}
              </div>
            )}
            <div className={s.circularContainer}>
              <CircularProgress />
            </div>
          </div>
        );
      case 'success':
        return (
          <div className={className} {...divProps}>
            {view(state.value)}
          </div>
        );
      default:
        return (
          <div className={className} {...divProps}>
            <Typography variant="h6">
              {state.error?.message ?? 'unknown error'}
            </Typography>
          </div>
        );
    }
  },
);

export default Loader;
