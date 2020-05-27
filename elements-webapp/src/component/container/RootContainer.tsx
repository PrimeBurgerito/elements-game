import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
  container: {
    'background-color': theme.palette.background.default,
    'height': '100%',
    '& > div': {
      height: '100%'
    }
  }
});

interface IRootContainerProps extends WithStyles<typeof styles> {
  children: React.ReactChild;
}

export const RootContainer = (props: IRootContainerProps): JSX.Element => {
  return <div id="container" className={props.classes.container}>{props.children}</div>;
};

export default withStyles(styles)(RootContainer);
