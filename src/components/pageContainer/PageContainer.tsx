import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';

import IPageContainerProps from './PageContainer.types';

const ContentContainer = styled.div`
  max-width: 1240px;
  width: 1240px;
  padding: 30px 30px;
  margin-top: 60px;
`;

function PageContainer({ children }: IPageContainerProps) {
  return (
    <Flex justifyContent="center" width={1}>
      <ContentContainer>{children}</ContentContainer>
    </Flex>
  );
}

export default PageContainer;
