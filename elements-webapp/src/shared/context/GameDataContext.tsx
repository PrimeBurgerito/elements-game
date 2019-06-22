import StatisticsApi from '@shared/api/StatisticsApi';
import { IAttribute, IObjective, IProperty } from '@type/statistics';
import * as React from 'react';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IGameData {
  attributes: IAttribute[];
  properties: IProperty[];
  objectives: IObjective[];
}

type GameDataContextType = [IGameData, Dispatch<SetStateAction<IGameData>>];
// tslint:disable-next-line:no-empty
const GameDataContext = createContext<GameDataContextType>([null, () => {}]);

export const GameDataProvider = (props: { children: React.ReactChild }) => {
  const [gameData, setGameData] = useState<IGameData>(null);

  useEffect(() => {
    Promise.all([
      StatisticsApi.findAttributes(),
      StatisticsApi.findProperties(),
      StatisticsApi.findObjectives()
    ]).then(([attributes, properties, objectives]) => setGameData({attributes, properties, objectives}));
  }, []);

  return (
    <GameDataContext.Provider value={[gameData, setGameData]}>
      {props.children}
    </GameDataContext.Provider>
  );
};

export default GameDataContext;
