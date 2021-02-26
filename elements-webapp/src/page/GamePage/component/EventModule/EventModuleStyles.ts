import makeStyles from '@material-ui/core/styles/makeStyles';

export const useEventModuleStyles = makeStyles({
  imageContainer: {
    'height': '100%',
    '& > div': {
      height: '100%'
    },
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%'
    }
  },
  textBox: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    margin: 'auto',
    width: '80%'
  }
});
