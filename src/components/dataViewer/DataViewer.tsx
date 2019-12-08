import React from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';

import StackContainer from 'components/stackContainer';
import { Heading } from 'components/text';
import { Colors } from 'utils';
import IDataViewerProps from './DataViewer.types';

// We save boilerplate code by creating this components
function DataViewer(props: IDataViewerProps) {
  const { isLoading, hideSpinner, isEmpty, children, isEmptyText, errorMessage } = props;

  // If the component is still loading, empty or contains an error message
  // We show whether the spinner or the error message
  if ((isLoading && !hideSpinner) || isEmpty || errorMessage) {
    return (
      <StackContainer>
        {isEmpty && !isLoading && !errorMessage && <Heading>{isEmptyText}</Heading>}
        {isLoading && !hideSpinner && <Spinner size={SpinnerSize.large} />}
        {errorMessage && <Heading color={Colors.red}>{errorMessage}</Heading>}
      </StackContainer>
    );
  }

  // Otherwise we display the component's children
  return children;
}

export default DataViewer;
