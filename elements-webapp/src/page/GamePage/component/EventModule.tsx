import ElementsCard from '@component/ui/ElementsCard';
import { MEDIA_URL } from '@constant/paths';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { IEvent, IOption } from '@type/Event';
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
  onNextScene: () => void;
  onOptionClick: (idx: number) => void;
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
        {props.currentEvent.type === 'OPTION' && renderChoices()}
      </ElementsCard>
    );
  };

  const renderChoices = (): JSX.Element => {
    const {options} = props.currentEvent;
    return (
      <>
        <Divider />
        {options && options.length && options.map((o: IOption, idx) =>
          <Button
            key={`option-${idx}`}
            disabled={o.disabled}
            onClick={() => props.onOptionClick(idx)}
          >{o.text}</Button>)
        }
      </>
    );
  };

  const nextSceneClick = () => {
    if (props.currentEvent.type === 'DEFAULT') {
      props.onNextScene();
    }
  };

  return (
    <>
      <Grid className={imageContainer} container justify="center" onClick={nextSceneClick}>
        <Grid item>
          <img src={imageUrl} alt="No image" />
        </Grid>
      </Grid>
      {renderTextBox()}
    </>
  );
};

export default EventModule;
