import React from 'react';
import { CompoundButton, Spinner, SpinnerSize } from 'office-ui-fabric-react';

import Locale from 'localization';
import StackContainer from 'components/stackContainer';
import ILoadingProps from './Loading.types';

function Loading(props: ILoadingProps) {
  const { error, timedOut, pastDelay, retry } = props;

  let errorComponent;
  if (error) {
    // @ts-ignore
    errorComponent = <CompoundButton text={Locale.failedToLoad} secondaryText={Locale.reloadPage} onClick={retry} />;
  }
  if (timedOut) {
    errorComponent = (
      // @ts-ignore
      <CompoundButton text={Locale.connectionTimeout} secondaryText={Locale.reloadPage} onClick={retry} />
    );
  }
  if (pastDelay) {
    errorComponent = <Spinner size={SpinnerSize.large} />;
  }

  return <StackContainer>{errorComponent}</StackContainer>;
}

export default Loading;
