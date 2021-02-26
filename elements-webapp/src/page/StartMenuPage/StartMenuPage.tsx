import ElementsCard from '@component/ui/ElementsCard';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { CurrentPage } from '@component/container/PageContainer';

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

type Props = {
  setCurrentPage: (page: CurrentPage) => void;
}

const StartMenuPage: React.FC<Props> = props => {
  const classes = useStyles({});

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item>
        <ElementsCard>
          <Grid className={classes.buttonContainer} container direction="column" justify="center" alignContent="center">
            <Grid item xs={12}>
              <Button onClick={() => props.setCurrentPage(CurrentPage.GAME)}>Enter Game</Button>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => props.setCurrentPage(CurrentPage.NEW_CHARACTER)}>New Character</Button>
            </Grid>
            <Grid item xs={12}><Button>Log Out</Button></Grid>
          </Grid>
        </ElementsCard>
      </Grid>
    </Grid>
  );
};

export default StartMenuPage;
