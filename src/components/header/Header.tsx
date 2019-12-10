import React from 'react';
import { Stack, CommandBar } from 'office-ui-fabric-react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import logo from 'assets/logo.png';
import { Text } from 'components/text';
import { Colors } from 'utils';
import IHeaderProps from './Header.types';
import './FullWidth.css';

const LogoContainer = styled(NavLink)`
  background-color: transparent;
  text-decoration: none;
  cursor: pointer !important;
  color: ${Colors.neutralPrimaryAlt} !important;
  text-decoration: ${Colors.neutralPrimaryAlt} !important;
`;

const UserName = styled(Text)`
  max-width: 241px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: unset;
  color: ${Colors.neutralPrimaryAlt} !important;
  text-decoration: ${Colors.neutralPrimaryAlt} !important;
`;

const HeaderContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 3px 2px;
  border-bottom: 1px solid ${Colors.neutralQuaternaryAlt};
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  width: -webkit-fill-available;
  width: -moz-available;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderStyled = styled.header`
  padding: 0 30px;
  max-width: 1240px;
  width: 1240px;
`;

function Header(props: IHeaderProps) {
  const { userDesc, navItems, farItems } = props;

  const commandBarStyles = () => ({
    root: {
      height: '60px',
      paddingRight: '0',
    },
  });

  const Separator = styled.div`
    height: 25px;
    width: 1px;
    background-color: ${Colors.neutralSecondary};
    margin: 0px 6px;
  `;

  return (
    <HeaderContainer>
      <HeaderStyled>
        <Stack horizontal verticalAlign="center">
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }} disableShrink style={{ flexShrink: 0 }}>
            <LogoContainer to="listings">
              <Stack
                horizontal
                verticalAlign="center"
                tokens={{ childrenGap: 10 }}
                disableShrink
                style={{ flexShrink: 0 }}
              >
                <img src={logo} width={30} alt="Logo" />
              </Stack>
            </LogoContainer>
            <Separator />
            <UserName color={Colors.neutralPrimaryAlt}>{userDesc}</UserName>
          </Stack>

          <CommandBar
            items={navItems}
            farItems={farItems}
            styles={commandBarStyles}
            shiftOnReduce={false}
            className="full-width"
          />
        </Stack>
      </HeaderStyled>
    </HeaderContainer>
  );
}

export default Header;
