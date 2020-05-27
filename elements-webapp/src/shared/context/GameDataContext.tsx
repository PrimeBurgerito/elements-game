import * as React from 'react';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IObjective } from '@type/Objective';
import { INumericProperty, IStringProperty } from '@type/Property';
import PropertyApi from '@shared/api/PropertyApi';
import ObjectiveApi from '@shared/api/ObjectiveApi';

interface IGameData {
  numericProperties: INumericProperty[];
  stringProperties: IStringProperty[];
  objectives: IObjective[];
}

type GameDataContextType = [IGameData, Dispatch<SetStateAction<IGameData>>];
// tslint:disable-next-line:no-empty
const GameDataContext = createContext<GameDataContextType>([null, () => {
}]);

export const GameDataProvider: React.FC = (props) => {
  const [gameData, setGameData] = useState<IGameData>(null);

  useEffect(() => {
    Promise.all([
      PropertyApi.findAttributes(),
      PropertyApi.findProperties(),
      ObjectiveApi.findObjectives()
    ]).then(([attributes, properties, objectives]: [INumericProperty[], IStringProperty[], IObjective[]]) => {
      setGameData({numericProperties: attributes, stringProperties: properties, objectives});
    });
  }, []);

  return (
    <GameDataContext.Provider value={[gameData, setGameData]}>
      {props.children}
    </GameDataContext.Provider>
  );
};

export default GameDataContext;
