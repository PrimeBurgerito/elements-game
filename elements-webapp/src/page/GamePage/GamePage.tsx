import ElementsCard from '@component/ui/ElementsCard';
import Button from '@material-ui/core/Button';
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
import CharacterImage from '@page/GamePage/component/CharacterImage';


const GamePage: React.FC = () => {
  const classes = useGamePageStyles({});
  const [gameData, controller] = useContext(GameContext);

  const renderMainCardContent = (): React.ReactElement => {
    if (gameData.resource.currentEvent) {
      return <EventModule
        currentEvent={gameData.resource.currentEvent}
        onNextScene={() => controller(nextScene())}
        onOptionClick={(idx: number) => controller(chooseSceneOption(idx))}
      />;
    } else if (gameData.resource.location) {
      return <LocationModule
        location={gameData.resource.location}
        onLocationChange={(name: string) => controller(changeLocation(name))}
      />;
    }
  };

  return (
    <Grid container className={classes.rootContainer}>
      <Grid item xs={3}>
        <ElementsCard>
          {gameData.resource.character ? 'GameState loaded' : 'Loading GameState...'}
          {gameData.resource.character && <CharacterImage character={gameData.resource.character} />}
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
