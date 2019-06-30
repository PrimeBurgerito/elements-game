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
  locationImage: {
    width: '100%'
  },
  locationNameDivider: {
    width: '50%',
    margin: 'auto',
    marginBottom: 15
  },
  locationName: {
    textAlign: 'center'
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
