import makeStyles from '@material-ui/core/styles/makeStyles';

export const useGamePageStyles = makeStyles({
  rootContainer: {
    '& > div': {
      height: '100%'
    },
    '& > div > .elements-card': {
      height: '100%'
    }
  },
  characterImage: {
    width: '100%'
  },
  characterNameDivider: {
    width: '75%',
    margin: 'auto',
    marginBottom: 15
  },
  characterName: {
    textAlign: 'center'
  },
  buttonContainer: {
    '& > div': {
      'margin': 'auto',
      '& > button': {
        minWidth: 200
      }
    }
  },
  mainPanelGrid: {
    position: 'relative',
    height: '100%'
  }
});
