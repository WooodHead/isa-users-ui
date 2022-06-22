import React from 'react';
import { useStore } from 'react-redux';
import { InjectReducerParams, RootStateKeyType } from './injector-typings';

/* Wrap redux-injectors with stricter types */

export const createInjectorsEnhancer =
  createReducerFunc =>
  createStore =>
  (...args: any[]) => {
    const store = createStore(...args);
    return {
      ...store,
      createReducer: createReducerFunc,
      injectedReducers: {},
    };
  };

export const useInjectReducer = <Key extends RootStateKeyType>(
  params: InjectReducerParams<Key>,
) => {
  const store = useStore();
  const [isInjected, setIsInjected] = React.useState(false);

  React.useLayoutEffect(() => {
    injectReducer(params.key, params.reducer, store);
    setIsInjected(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isInjected;
};

const injectReducer = (key, reducer, store: any) => {
  // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
  if (
    Reflect.has(store.injectedReducers, key) &&
    store.injectedReducers[key] === reducer
  ) {
    return;
  }

  store.injectedReducers[key] = reducer;
  store.replaceReducer(store.createReducer(store.injectedReducers));
};
