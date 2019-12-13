import styled from 'styled-components';
import { Colors } from 'utils';
import { IColorPreviewProps } from './ColorPreview.types';

const radius = '25px';

const ColorPreview = styled.div<IColorPreviewProps>`
  width: ${radius};
  height: ${radius};
  min-height: ${radius};
  min-width: ${radius};
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 1px solid ${Colors.neutralLight};
`;

export default ColorPreview;
