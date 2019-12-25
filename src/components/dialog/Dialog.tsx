import React from 'react';
import {
  Dialog as OfficeDialog,
  DialogType,
  DialogFooter,
  DefaultButton,
  PrimaryButton,
  IStyleFunction,
  IDialogContentStyleProps,
  IDialogContentStyles,
} from 'office-ui-fabric-react';

import { Colors } from 'utils';
import Locale from 'localization';
import { IDialogProps } from './Dialog.types';

function Dialog(props: IDialogProps) {
  const { show, hideDialog, isLoading, mainAction, dialogKey, title, mainActionText, isAlert, children } = props;
  const hideThisDialog = () => hideDialog(dialogKey);
  const onPrimaryButtonClick = () => mainAction();

  let dialogStyles: IStyleFunction<IDialogContentStyleProps, IDialogContentStyles> | Partial<IDialogContentStyles> = {};
  let buttonStyles = {};

  if (isAlert) {
    dialogStyles = {
      header: {
        backgroundColor: Colors.red,
      },
      content: {
        borderColor: Colors.red,
        borderTopColor: Colors.red,
      },
      title: {
        color: Colors.white,
      },
    };

    buttonStyles = {
      root: { backgroundColor: Colors.red },
      rootHovered: {
        backgroundColor: Colors.redDark,
      },
      rootChecked: {
        backgroundColor: Colors.redDark,
      },
      rootPressed: {
        backgroundColor: Colors.redDark,
      },
    };
  }

  return (
    <OfficeDialog
      hidden={!show}
      dialogContentProps={{
        type: DialogType.largeHeader,
        title,
        styles: dialogStyles,
      }}
      modalProps={{ isBlocking: true }}
      onDismiss={hideThisDialog}
      isDarkOverlay
    >
      {children}
      <DialogFooter>
        <DefaultButton onClick={hideThisDialog} disabled={isLoading}>
          {Locale.hideDialog}
        </DefaultButton>
        <PrimaryButton styles={buttonStyles} disabled={isLoading} onClick={onPrimaryButtonClick}>
          {mainActionText}
        </PrimaryButton>
      </DialogFooter>
    </OfficeDialog>
  );
}

export default Dialog;
