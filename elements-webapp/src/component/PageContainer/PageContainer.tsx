import { Typography } from '@material-ui/core';
import LoginPage from '@page/LoginPage/LoginPage';
import NewCharacterPage from '@page/NewCharacterPage/NewCharacterPage';
import StartMenuPage from '@page/StartMenuPage/StartMenuPage';
import CurrentPageContext, { CurrentPage } from '@shared/context/CurrentPageContext';
import { IUser } from '@type/user';
import * as React from 'react';
import { useContext, useState } from 'react';

const PageContainer = (): JSX.Element => {
  const [user, setUser] = useState<IUser | null>(null);
  const [currentPage] = useContext(CurrentPageContext);

  const choosePage = (): JSX.Element => {
    if (user && user.username) {
      switch (currentPage) {
        case CurrentPage.START_MENU:
          return <StartMenuPage />;
        case CurrentPage.NEW_CHARACTER:
          return <NewCharacterPage />;
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
