import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';

const styles = (theme: Theme) => createStyles({
  container: {
    'background-color': theme.palette.background.default,
    'height': '100%',
    '& > div': {
      height: '100%'
    }
  }
});

type Props = WithStyles<typeof styles>;

const RootContainer: React.FC<Props> = props => {
  return <div id="container" className={props.classes.container}>{props.children}</div>;
};

export default withStyles(styles)(RootContainer);
