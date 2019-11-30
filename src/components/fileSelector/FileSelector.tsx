import React, { useState } from 'react';
import { DefaultButton, IButtonStyles, Stack, Spinner, SpinnerSize } from 'office-ui-fabric-react';

import Text from 'components/text';
import { IFileSelectorProps } from './FileSelector.types';

const buttonStyles: IButtonStyles = {
  textContainer: {
    whiteSpace: 'nowrap',
  },
};

function FileSelector(props: IFileSelectorProps) {
  const { id, onFileSelect, isLoading } = props;
  const [fileName, setFileName] = useState();

  const triggerInput = () => {
    const inputRef: HTMLInputElement | null = document.querySelector(`#${id}`);
    if (inputRef) {
      inputRef.click();
    } else {
      throw new Error('Input not found');
    }
  };

  const getFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileName(e.target.files[0].name);
    }

    if (onFileSelect) {
      onFileSelect(e);
    }
  };

  return (
    <Stack tokens={{ childrenGap: 10 }} horizontal>
      <input type="file" hidden id={id} onChange={getFiles} />
      <DefaultButton {...props} styles={buttonStyles} onClick={triggerInput} disabled={isLoading} />
      {isLoading ? <Spinner size={SpinnerSize.large} /> : <Text>{fileName}</Text>}
    </Stack>
  );
}

export default FileSelector;
