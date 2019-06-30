import ElementsCard from '@component/ui/ElementsCard';
import { MEDIA_URL } from '@constant/paths';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import GameContext, { changeLocation, getGameState } from '@page/GamePage/GameContext/GameContext';
import { useGamePageStyles } from '@page/GamePage/GamePageResource';
import * as React from 'react';
import { useContext, useState } from 'react';


const GamePage = (): JSX.Element => {
  const classes = useGamePageStyles({});
  const [gameData, controller] = useContext(GameContext);
  const [nearbyLocationModalOpen, setNearbyLocationModalOpen] = useState(false);

  const renderCharacterImage = (): JSX.Element => {
    const fileName = gameData.clientGameState.characterStatistics.images.default.fileName;
    return (
      <ElementsCard type="golden2">
        <img className={classes.characterImage} src={`${MEDIA_URL}/${fileName}`} alt="No image" />
      </ElementsCard>
    );
  };

  const renderNearbyLocationsModal = (): JSX.Element => {
    return (
      <Dialog open={nearbyLocationModalOpen} onClose={() => setNearbyLocationModalOpen(false)}>
        <DialogTitle><Typography variant="h5">Nearby locations</Typography></DialogTitle>
        {gameData.clientGameState.location.nearbyLocations.map((name) =>
          <Button key={`location-${name}`} onClick={() => controller(changeLocation(name))}>{name}</Button>)
        }
      </Dialog>
    );
  };

  const renderLocation = (): JSX.Element => {
    const location = gameData.clientGameState.location;
    return (
      <>
        {renderNearbyLocationsModal()}
        <Typography className={classes.locationName} variant="h2">{location.name}</Typography>
        <Divider className={classes.locationNameDivider} />
        {location.images && location.images.length &&
        <img onClick={() => setNearbyLocationModalOpen(true)} className={classes.locationImage}
             src={`${MEDIA_URL}/${location.images[0].fileName}`} alt="No image" />
        }
      </>
    );
  };

  return (
    <Grid container className={classes.rootContainer}>
      <Grid item xs={3}>
        <ElementsCard>
          {gameData.clientGameState.characterStatistics ? 'GameState loaded' : 'Loading GameState...'}
          <Button onClick={() => controller(getGameState())}>UPDATE GAME STATE</Button>
          {gameData.clientGameState.characterStatistics && renderCharacterImage()}
        </ElementsCard>
      </Grid>
      <Grid item xs={9}>
        <ElementsCard>
          {gameData.clientGameState.location && renderLocation()}
        </ElementsCard>
      </Grid>
    </Grid>
  );
};

export default GamePage;
