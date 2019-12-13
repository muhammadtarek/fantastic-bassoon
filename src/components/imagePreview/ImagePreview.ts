import styled from 'styled-components';
import { Colors } from 'utils';
import { IImagePreviewProp } from './ImagePreview.types';

const radius = '30px';

const ImagePreview = styled.img<IImagePreviewProp>`
  width: ${props => props.radius || radius};
  height: ${props => props.radius || radius};
  min-height: ${props => props.radius || radius};
  min-width: ${props => props.radius || radius};
  border-radius: 4px;
  border: 1px solid ${props => (props.isSelected ? Colors.themeDarker : Colors.neutralTertiary)};
  object-fit: cover;
`;

export default ImagePreview;
