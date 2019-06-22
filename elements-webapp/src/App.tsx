import PageContainer from '@component/PageContainer/PageContainer';
import RootContainer from '@component/RootContainer/RootContainer';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import DefaultTheme from '@shared/DefaultTheme';
import history from '@shared/history';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Router, Switch } from 'react-router';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

const Routes = () => (
  <Switch>
    <Route path="/" exact component={() => <PageContainer />} />
    <Route render={() => <div>Not found</div>} />
  </Switch>
);

const App = (): JSX.Element => {
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
