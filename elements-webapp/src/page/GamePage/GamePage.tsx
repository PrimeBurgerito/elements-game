import ElementsCard from '@component/ui/ElementsCard';
import { MEDIA_URL } from '@constant/paths';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import EventModule from '@page/GamePage/component/EventModule';
import LocationModule from '@page/GamePage/component/LocationModule';
import GameContext, {
  changeLocation,
  chooseSceneOption,
  getGameState,
  nextScene
} from '@page/GamePage/GameContext/GameContext';
import { useGamePageStyles } from '@page/GamePage/GamePageResource';
import * as React from 'react';
import { useContext } from 'react';


const GamePage = (): JSX.Element => {
  const classes = useGamePageStyles({});
  const [gameData, controller] = useContext(GameContext);

  const renderCharacterImage = (): JSX.Element => {
    const {fileName} = gameData.clientGameState.character.images.default;
    const {name} = gameData.clientGameState.character;
    return (
      <>
        <Typography variant="h5" className={classes.characterName}>{name}</Typography>
        <Divider className={classes.characterNameDivider} />
        <ElementsCard type="golden2">
          <img className={classes.characterImage} src={`${MEDIA_URL}/${fileName}`} alt="No image" />
        </ElementsCard>
      </>
    );
  };

  const renderMainCardContent = (): JSX.Element => {
    if (gameData.clientGameState.currentEvent) {
      return <EventModule
        currentEvent={gameData.clientGameState.currentEvent}
        onNextScene={() => controller(nextScene())}
        onOptionClick={(idx) => controller(chooseSceneOption(idx))}
      />;
    } else if (gameData.clientGameState.location) {
      return <LocationModule
        location={gameData.clientGameState.location}
        onLocationChange={(name) => controller(changeLocation(name))}
      />;
    }
  };

  return (
    <Grid container className={classes.rootContainer}>
      <Grid item xs={3}>
        <ElementsCard>
          {gameData.clientGameState.character ? 'GameState loaded' : 'Loading GameState...'}
          {gameData.clientGameState.character && renderCharacterImage()}
          <Button onClick={() => controller(getGameState())}>UPDATE GAME STATE</Button>
        </ElementsCard>
      </Grid>
      <Grid item xs={9}>
        <ElementsCard className={classes.mainPanelGrid}>
          {renderMainCardContent()}
        </ElementsCard>
      </Grid>
    </Grid>
  );
};

export default GamePage;
