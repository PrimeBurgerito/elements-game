import ElementsCard from '@component/ui/ElementsCard';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CurrentPageContext, { CurrentPage } from '@shared/context/CurrentPageContext';
import * as React from 'react';
import { useContext } from 'react';

const useStyles = makeStyles({
  buttonContainer: {
    '& > div': {
      'margin': 'auto',
      '& > button': {
        minWidth: 200
      }
    }
  }
});

const StartMenuPage = (): JSX.Element => {
  const classes = useStyles({});
  const [, setCurrentPage] = useContext(CurrentPageContext);

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item>
        <ElementsCard>
          <Grid className={classes.buttonContainer} container direction="column" justify="center" alignContent="center">
            <Grid item xs={12}>
              <Button onClick={() => setCurrentPage(CurrentPage.NEW_CHARACTER)}>New Game</Button>
            </Grid>
            <Grid item xs={12}><Button>Continue</Button></Grid>
            <Grid item xs={12}><Button>Log Out</Button></Grid>
          </Grid>
        </ElementsCard>
      </Grid>
    </Grid>
  );
};

export default StartMenuPage;
