import React from 'react';
import { Stack, IStackProps } from 'office-ui-fabric-react';

const loadingContainerStyles = () => ({
  root: {
    width: '100%',
    height: '100%',
    minHeight: '300px',
  },
});

function StackContainer(props: IStackProps) {
  return <Stack horizontalAlign="center" verticalAlign="center" styles={loadingContainerStyles} {...props} />;
}

export default StackContainer;
