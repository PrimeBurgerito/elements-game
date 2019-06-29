import { IClientGameState } from '@type/ClientGameState';
import { Dispatch, ReducerAction, useReducer } from 'react';

export const initialGameState = {
  connected: false,
  test: '',
  clientGameState: {} as IClientGameState
};

export const connected = () => ({type: 'CONNECTED', value: true} as const);
export const test = (value: string) => ({type: 'TEST', value} as const);
export const updateClientGameState = (value: IClientGameState) => ({type: 'GAME_STATE', value} as const);

export type GameState = typeof initialGameState;
type GameAction = ReturnType<typeof test | typeof connected | typeof updateClientGameState>;

const gameStateReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'TEST':
      return {...state, test: action.value || 'no payload :('};
    case 'CONNECTED':
      return {...state, connected: action.value};
    case 'GAME_STATE':
      return {...state, clientGameState: action.value};
  }
};
export type GameStateDispatcher = Dispatch<ReducerAction<typeof gameStateReducer>>;

export default (state = initialGameState) => useReducer(gameStateReducer, state);
