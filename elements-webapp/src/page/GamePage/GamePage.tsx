import { Button } from '@material-ui/core';
import GameContext from '@page/GamePage/GameContext/GameContext';
import * as React from 'react';
import { useContext } from 'react';

const GamePage = (): JSX.Element => {
  const [gameData, controller] = useContext(GameContext);

  return (
    <>
      {gameData.test}
      <Button onClick={() => controller('TEST')}>TEST</Button>
    </>
  );
};

export default GamePage;
