import styled from 'styled-components';
import { Colors } from 'utils';
import { IImagePreviewProp } from './ImagePreview.types';

const radius = '30px';

const ImagePreview = styled.img<IImagePreviewProp>`
  width: ${radius};
  height: ${radius};
  min-height: ${radius};
  min-width: ${radius};
  border-radius: 4px;
  border: 1px solid ${props => (props.isSelected ? Colors.themeDarker : Colors.neutralTertiary)};
`;

export default ImagePreview;
