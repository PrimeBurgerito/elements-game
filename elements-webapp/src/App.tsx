import RootContainer from '@component/Container/RootContainer';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { hot } from 'react-hot-loader/root';
import DefaultTheme from '@shared/DefaultTheme';
import history from '@shared/config/history';
import React from 'react';
import { Route, Router, Switch } from 'react-router';
import PageContainer from '@component/container/PageContainer';

if (process.env.NODE_ENV !== 'production') {
  // tslint:disable-next-line:no-console
  console.log('Looks like we are in development mode!');
}

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={() => <PageContainer />} />
    <Route render={() => <div>Not found</div>} />
  </Switch>
);

const App: React.FC = () => (
  <>
    <CssBaseline />
    <ThemeProvider theme={DefaultTheme}>
      <RootContainer>
        <Router history={history}>
          <Routes />
        </Router>
      </RootContainer>
    </ThemeProvider>
  </>
);

export default hot(App);
