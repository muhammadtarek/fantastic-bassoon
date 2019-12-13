/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { DefaultButton, IButtonStyles, Stack, Spinner, SpinnerSize } from 'office-ui-fabric-react';

import Text from 'components/text';
import ImagePreview from 'components/imagePreview';
import { IFileSelectorProps } from './FileSelector.types';

const buttonStyles: IButtonStyles = {
  textContainer: {
    whiteSpace: 'nowrap',
  },
};

function FileSelector(props: IFileSelectorProps) {
  const { id, onFileSelect } = props;
  const [isProcessing, setIsProcessing] = useState();
  const [images, setImages] = useState<string[]>();

  const triggerInput = () => {
    const inputRef: HTMLInputElement | null = document.querySelector(`#${id}`);
    if (inputRef) {
      inputRef.click();
    } else {
      throw new Error('Input not found');
    }
  };

  const readAsDataURL = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        return resolve({ data: fileReader.result, name: file.name, size: file.size, type: file.type });
      };
      fileReader.readAsDataURL(file);
    });
  };

  const getFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsProcessing(true);
    if (e.target.files) {
      const files = await Promise.all(
        [...e.target.files].map(f => {
          return readAsDataURL(f);
        }),
      );

      const imagesAsBas64 = files.map((file: any) => file.data);
      setImages(imagesAsBas64);
      if (onFileSelect) {
        onFileSelect(imagesAsBas64);
      }
    }

    setIsProcessing(false);
  };

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <input type="file" hidden id={id} onChange={getFiles} multiple accept=".gif,.jpg,.jpeg,.png" />
      <DefaultButton {...props} styles={buttonStyles} onClick={triggerInput} disabled={isProcessing} />
      {images && images.length === 0 && isProcessing ? (
        <Spinner size={SpinnerSize.large} />
      ) : (
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }} wrap>
          {images && images.map((image: string) => <ImagePreview key={image} radius="50px" src={image} />)}
        </Stack>
      )}
    </Stack>
  );
}

export default FileSelector;
