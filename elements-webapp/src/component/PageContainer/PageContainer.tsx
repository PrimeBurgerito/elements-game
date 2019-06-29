import { Typography } from '@material-ui/core';
import { GameContextProvider } from '@page/GamePage/GameContext/GameContext';
import GamePage from '@page/GamePage/GamePage';
import LoginPage from '@page/LoginPage/LoginPage';
import NewCharacterPage from '@page/NewCharacterPage/NewCharacterPage';
import StartMenuPage from '@page/StartMenuPage/StartMenuPage';
import { GameDataProvider } from '@shared/context/GameDataContext';
import { IUser } from '@type/user';
import * as React from 'react';
import { useState } from 'react';

export enum CurrentPage {
  START_MENU, NEW_CHARACTER, GAME
}

const PageContainer = (): JSX.Element => {
  const [user, setUser] = useState<IUser | null>(null);
  const [currentPage, setCurrentPage] = useState<CurrentPage>(CurrentPage.START_MENU);

  const userLoggedInPages = (): JSX.Element => {
    switch (currentPage) {
      case CurrentPage.START_MENU:
        return <StartMenuPage setCurrentPage={setCurrentPage} />;
      case CurrentPage.NEW_CHARACTER:
        return <GameDataProvider><NewCharacterPage setCurrentPage={setCurrentPage} /></GameDataProvider>;
      case CurrentPage.GAME:
        return <GameContextProvider><GamePage /></GameContextProvider>;
      default:
        return <div><Typography variant="caption">Logged in</Typography></div>;
    }
  };

  const choosePage = (): JSX.Element => {
    return user && user.username ? userLoggedInPages() : <LoginPage onLogin={setUser} />;
  };

  return choosePage();
};

export default PageContainer;
