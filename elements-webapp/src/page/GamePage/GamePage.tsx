import ElementsCard from '@component/ui/ElementsCard';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GameContext from '@page/GamePage/GameContext/GameContext';
import { useGamePageStyles } from '@page/GamePage/GamePageResource';
import * as React from 'react';
import { useContext } from 'react';


const GamePage = (): JSX.Element => {
  const classes = useGamePageStyles({});
  const [gameData, controller] = useContext(GameContext);

  const renderCharacterImage = (): JSX.Element => {
    const fileName = gameData.clientGameState.characterStatistics.images.default.fileName;
    return (
      <ElementsCard type="golden2">
        <img className={classes.characterImage} src={`http://www.localhost:80/${fileName}`} alt="No image" />
      </ElementsCard>
    );
  };

  return (
    <>
      <Grid container className={classes.rootContainer}>
        <Grid item xs={3}>
          <ElementsCard>
            {gameData.clientGameState.characterStatistics ? 'GameState loaded' : 'Loading GameState...'}
            <Button onClick={() => controller('GAME_STATE')}>UPDATE GAME STATE</Button>
            {renderCharacterImage()}
          </ElementsCard>
        </Grid>
        <Grid item xs={9}>
          <ElementsCard>

          </ElementsCard>
        </Grid>
      </Grid>
    </>
  );
};

export default GamePage;
