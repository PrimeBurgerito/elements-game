import { Dispatch, ReducerAction, useReducer } from 'react';

export const initialGameState = {
  connected: false,
  test: ''
};

export const connected = () => {
  return {
    type: 'CONNECTED',
    value: true
  } as const;
};

export const test = (value: string) => {
  return {
    type: 'TEST',
    value
  } as const;
};

export type GameState = typeof initialGameState;
type GameAction = ReturnType<typeof test | typeof connected>;

const gameStateReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'TEST':
      return {...state, test: action.value || 'no payload :('};
    case 'CONNECTED':
      return {...state, connected: action.value};
  }
};
export type GameStateDispatcher = Dispatch<ReducerAction<typeof gameStateReducer>>;

export default (state = initialGameState) => useReducer(gameStateReducer, state);
