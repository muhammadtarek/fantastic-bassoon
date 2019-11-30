import React from 'react';
import { Stack, CommandBar } from 'office-ui-fabric-react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import logo from 'assets/logo.png';
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

const HeaderContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 3px 2px;
  border-bottom: 1px solid ${Colors.neutralQuaternaryAlt};
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  width: -webkit-fill-available;
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
  const { navItems, farItems } = props;

  const commandBarStyles = () => ({
    root: {
      height: '60px',
      paddingRight: '0',
    },
  });

  return (
    <HeaderContainer>
      <HeaderStyled>
        <Stack horizontal verticalAlign="center">
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }} disableShrink style={{ flexShrink: 0 }}>
            <LogoContainer to="dashboard">
              <Stack
                horizontal
                verticalAlign="center"
                tokens={{ childrenGap: 10 }}
                disableShrink
                style={{ flexShrink: 0 }}
              >
                <img src={logo} width={30} alt="rentify" />
              </Stack>
            </LogoContainer>
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
