import ElementsCard from '@component/ui/ElementsCard';
import { MEDIA_URL } from '@constant/paths';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { IEvent } from '@type/Event';
import * as React from 'react';
import { useEffect, useState } from 'react';

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

interface IEventModuleProps {
  currentEvent: IEvent;
}

const EventModule = (props: IEventModuleProps): JSX.Element => {
  const {imageContainer, textBox} = useEventModuleStyles({});
  const [imageUrl, setImageUrl] = useState('');
  const [isTextBoxOpen, setTextBoxOpen] = useState(true);

  useEffect(() => {
    window.oncontextmenu = (e) => {
      e.preventDefault();
      setTextBoxOpen(!isTextBoxOpen);
    };
  }, [isTextBoxOpen]);

  useEffect(() => {
    const {image} = props.currentEvent;
    if (image && image.fileName) {
      setImageUrl(`${MEDIA_URL}/${image.fileName}`);
    }
    return () => setImageUrl('');
  }, [props.currentEvent.image]);

  const renderTextBox = (): JSX.Element => {
    return (
      <ElementsCard hidden={!isTextBoxOpen} className={textBox} type="golden">
        <Typography variant="body1">{props.currentEvent.text}</Typography>
      </ElementsCard>
    );
  };

  return (
    <>
      <Grid className={imageContainer} container justify="center">
        <Grid item>
          <img src={imageUrl} alt="No image" />
        </Grid>
      </Grid>
      {renderTextBox()}
    </>
  );
};

export default EventModule;
