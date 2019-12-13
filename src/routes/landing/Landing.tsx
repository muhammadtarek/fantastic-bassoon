import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Image, Stack } from 'office-ui-fabric-react';
import styled from 'styled-components';
import BG from 'assets/bg.png';
import Logo from 'assets/logo.png';
import { useSelector } from 'react-redux';
import { IUserStore } from 'store/types';
import { Constants } from 'utils';
import Signup from './Signup.form';
import Login from './Login.form';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${BG});
`;

function LandingPage() {
  const { isLoggedIn } = useSelector(({ user }: { user: IUserStore }) => ({
    isLoggedIn: user.isLoggedIn,
  }));

  return isLoggedIn ? (
    <Redirect to={Constants.LISTINGS} />
  ) : (
    <Container>
      <Stack horizontal horizontalAlign="center">
        <Stack verticalAlign="center" horizontalAlign="center" grow={3}>
          <Image src={Logo} width={250} />
        </Stack>
        <Stack
          horizontalAlign="center"
          verticalAlign="center"
          grow={1}
          tokens={{ padding: 20 }}
          styles={{ root: { backgroundColor: 'white', height: '100vh' } }}
        >
          <Stack styles={{ root: { width: '75%', minWidth: '400px' } }}>
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

export default LandingPage;
