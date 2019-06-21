import * as React from 'react';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

export enum CurrentPage {
  START_MENU, NEW_CHARACTER
}

type CurrentPageContextType = [CurrentPage, Dispatch<SetStateAction<CurrentPage>>];

// tslint:disable-next-line:no-empty
const CurrentPageContext = createContext<CurrentPageContextType>([CurrentPage.START_MENU, () => {}]);

export const CurrentPageProvider = (props: { children: React.ReactChild }) => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>(CurrentPage.START_MENU);

  return (
    <CurrentPageContext.Provider value={[currentPage, setCurrentPage]}>
      {props.children}
    </CurrentPageContext.Provider>
  );
};

export default CurrentPageContext;
