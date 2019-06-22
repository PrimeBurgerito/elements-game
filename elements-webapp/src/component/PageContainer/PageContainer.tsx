import { Typography } from '@material-ui/core';
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

  const choosePage = (): JSX.Element => {
    if (user && user.username) {
      switch (currentPage) {
        case CurrentPage.START_MENU:
          return <StartMenuPage setCurrentPage={setCurrentPage} />;
        case CurrentPage.NEW_CHARACTER:
          return <GameDataProvider><NewCharacterPage setCurrentPage={setCurrentPage} /></GameDataProvider>;
        case CurrentPage.GAME:
          return <GamePage />;
        default:
          return <div><Typography variant="caption">Logged in</Typography></div>;
      }
    } else {
      return <LoginPage onLogin={setUser} />;
    }
  };

  return choosePage();
};

export default PageContainer;
