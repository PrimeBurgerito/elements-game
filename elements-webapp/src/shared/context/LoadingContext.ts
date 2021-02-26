import React from 'react';
import { useContext } from 'react';

interface ILoadingContext {
  loadings: Map<string, number>;
}

const LoadingContext = React.createContext<ILoadingContext>({
  loadings: new Map<string, number>()
});

export const useLoadingContext = () => {
  const loadingContext = useContext<ILoadingContext>(LoadingContext);

  const isLoading = (key: string): boolean => {
    return !!loadingContext.loadings.get(key);
  };

  const addLoading = (key: string) => {
    const newLoadings = loadingContext.loadings.get(key);
    loadingContext.loadings.set(key, newLoadings ? newLoadings + 1 : 1);
  };

  const endLoading = (key: string) => {
    const newLoadings = loadingContext.loadings.get(key);
    loadingContext.loadings.set(key, newLoadings ? newLoadings - 1 : 0);
  };

  return {
    isLoading,
    addLoading,
    endLoading
  };
};
