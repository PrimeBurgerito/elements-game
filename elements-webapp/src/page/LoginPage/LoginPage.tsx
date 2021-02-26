import ElementsCard from '@component/ui/ElementsCard';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import AuthApi from '@shared/api/AuthApi';
import UserApi from '@shared/api/UserApi';
import { IUser } from '@type/user';
import React, { useEffect, useState } from 'react';
import { InputProps as StandardInputProps } from '@material-ui/core/Input/Input';

const getClasses = makeStyles({
  loginButtonGrid: {
    margin: 'auto'
  }
});

type Props = {
  onLogin: (user: IUser) => void;
}

const LoginPage: React.FC<Props> = props => {
  const classes = getClasses({});
  const [userLogin, setUserLogin] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    UserApi.getCurrentUser().then((user: IUser) => {
      if (user && user.username) {
        props.onLogin(user);
      }
    });
  }, []);

  const handleLoginSubmit = async (): Promise<void> => {
    await AuthApi.getAuthenticationToken(userLogin.username, userLogin.password);
    const user = await UserApi.getCurrentUser();
    if (user && user.username) {
      props.onLogin(user);
    } else {
      console.error('Login failed!');
    }
  };

  const handleChange: StandardInputProps['onChange'] = ({target}) => {
    setUserLogin({...userLogin, [target.name]: target.value});
  };

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item>
        <ElementsCard>
          <Typography variant="h1" gutterBottom>User login</Typography>
          <form>
            <Grid container direction="column" justify="center" alignContent="center">
              <Grid item>
                <TextField
                  id="username-field"
                  autoComplete="current-username"
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  name="username"
                  value={userLogin.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="password-field"
                  autoComplete="current-password"
                  label="Password"
                  margin="normal"
                  type="password"
                  variant="outlined"
                  name="password"
                  value={userLogin.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} className={classes.loginButtonGrid}>
                <Button onClick={handleLoginSubmit} disabled={!userLogin.username || !userLogin.password}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </ElementsCard>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
