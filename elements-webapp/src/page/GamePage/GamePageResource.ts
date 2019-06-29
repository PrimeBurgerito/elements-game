import makeStyles from '@material-ui/core/styles/makeStyles';

export const useGamePageStyles = makeStyles({
  rootContainer: {
    '& > div > .elements-card': {
      height: '100%'
    }
  },
  characterImage: {
    width: '100%'
  },
  buttonContainer: {
    '& > div': {
      'margin': 'auto',
      '& > button': {
        minWidth: 200
      }
    }
  }
});
