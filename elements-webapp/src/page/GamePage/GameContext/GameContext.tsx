import { GameState, initialGameState } from '@page/GamePage/GameContext/GameState';
import ElementsWebsocket from '@shared/websocket/ElementsWebsocket';
import * as React from 'react';
import { createContext, useEffect, useState } from 'react';
import useGameStateReducer from './GameState';

interface IGameContextProviderProps {
  children: React.ReactChild;
}

export const getGameState = () => ({type: 'GAME_STATE'} as const);
export const changeLocation = (locationName: string) => ({type: 'CHANGE_LOCATION', value: locationName} as const);
export const nextScene = () => ({type: 'NEXT_SCENE'} as const);

export type ControllerAction = ReturnType<typeof getGameState | typeof changeLocation | typeof nextScene>;

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
    switch (action.type) {
      case 'GAME_STATE':
        ws.getNewClientGameState();
        break;
      case 'CHANGE_LOCATION':
        ws.changeLocation(action.value);
        break;
      case 'NEXT_SCENE':
        ws.nextScene();
        break;
    }
  };

  return (
    <GameContext.Provider value={[state, controller]}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContext;
