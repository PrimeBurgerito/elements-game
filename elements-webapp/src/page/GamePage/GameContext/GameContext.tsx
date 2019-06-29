import { GameState, initialGameState } from '@page/GamePage/GameContext/GameState';
import ElementsWebsocket from '@shared/websocket/ElementsWebsocket';
import * as React from 'react';
import { createContext, useEffect, useState } from 'react';
import useGameStateReducer from './GameState';

interface IGameContextProviderProps {
  children: React.ReactChild;
}

export type ControllerAction =
  | 'GAME_STATE';

type GameContextType = [GameState, (action: ControllerAction) => void];
const GameContext = createContext<GameContextType>([initialGameState, () => null]);


export const GameContextProvider = (props: IGameContextProviderProps): JSX.Element => {
  const [state, dispatch] = useGameStateReducer();
  const [ws, setWs] = useState<ElementsWebsocket>();

  useEffect(() => {
    setWs(new ElementsWebsocket(dispatch));
    return () => ws.disconnect();
  }, []);

  const controller = (action: ControllerAction) => {
    switch (action) {
      case 'GAME_STATE':
        ws.getNewClientGameState();
    }
  };

  return (
    <GameContext.Provider value={[state, controller]}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContext;
