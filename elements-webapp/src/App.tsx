import RootContainer from '@component/Container/RootContainer';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import DefaultTheme from '@shared/DefaultTheme';
import history from '@shared/config/history';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Router, Switch } from 'react-router';
import PageContainer from '@component/container/PageContainer';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={() => <PageContainer />} />
    <Route render={() => <div>Not found</div>} />
  </Switch>
);

const App: React.FC = () => {
  return (
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
};

export default hot(App);
