import ElementsCard from '@component/ui/ElementsCard';
import { MEDIA_URL } from '@constant/paths';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { IOption, IScene } from '@type/Event';
import React, { useEffect, useState } from 'react';
import { useEventModuleStyles } from '@page/GamePage/component/EventModule/EventModuleStyles';
import { useToggle } from '@shared/hooks/ToggleHook';

type Props = {
  currentScene: IScene;
  onNextScene: () => void;
  onOptionClick: (idx: number) => void;
}

const EventModule: React.FC<Props> = props => {
  const {imageContainer, textBox} = useEventModuleStyles({});
  const [imageUrl, setImageUrl] = useState('');
  const [isTextBoxOpen, toggleTextBox] = useToggle(true);

  useEffect(() => {
    window.oncontextmenu = e => {
      e.preventDefault();
      toggleTextBox();
    };
  }, [isTextBoxOpen]);

  useEffect(() => {
    const {image} = props.currentScene;
    if (image && image.fileName) {
      setImageUrl(`${MEDIA_URL}/${image.fileName}`);
    }
    return () => setImageUrl('');
  }, [props.currentScene.image]);

  const renderChoices = (): React.ReactElement => {
    const {options} = props.currentScene;
    return (
      <>
        <Divider />
        {options && options.length && options.map((o: IOption, idx) =>
          <Button key={`option-${idx}`} disabled={o.disabled} onClick={() => props.onOptionClick(idx)}>
            {o.text}
          </Button>)
        }
      </>
    );
  };

  const nextSceneClick = (): void => {
    if (props.currentScene.type === 'DEFAULT') {
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
      <ElementsCard hidden={!isTextBoxOpen} className={textBox} type="golden">
        <Typography variant="body1">{props.currentScene.text}</Typography>
        {props.currentScene.type === 'OPTION' && renderChoices()}
      </ElementsCard>
    </>
  );
};

export default EventModule;
