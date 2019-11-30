import styled from 'styled-components';
import { color, space, maxWidth, width, textAlign, WidthProps, MaxWidthProps, TextAlignProps } from 'styled-system';

type Props = WidthProps & MaxWidthProps & TextAlignProps;

const MegaTitle = styled.h1<Props>`
  font-size: 40px;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 400;
  ${color};
  ${space};
  ${maxWidth};
  ${width};
  ${textAlign};
`;

const Title = styled.h1<Props>`
  font-size: 26px;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 600;
  ${color};
  ${space};
  ${maxWidth};
  ${width};
  ${textAlign};
`;

const Heading = styled.h1<Props>`
  font-size: 22px;
  margin-top: 0;
  margin-bottom: 6px;
  font-weight: 500;
  ${color};
  ${space};
  ${maxWidth};
  ${width};
  ${textAlign};
`;

const SubHeading = styled.h3<Props>`
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 4px;
  font-weight: 400;
  ${color};
  ${space};
  ${maxWidth};
  ${width};
  ${textAlign};
`;

const Text = styled.label<Props>`
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 2px;
  font-weight: 400;
  ${color};
  ${space};
  ${maxWidth};
  ${width};
  ${textAlign};
`;

const Caption = styled.span<Props>`
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 1px;
  ${color};
  ${space};
  ${maxWidth};
  ${width};
  ${textAlign};
`;

export { MegaTitle, Title, Heading, SubHeading, Text, Caption };
