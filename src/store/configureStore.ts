/**
 * Create the store with dynamic reducers
 */

import { configureStore, StoreEnhancer } from '@reduxjs/toolkit';

import { createReducer } from './reducers';
import { createInjectorsEnhancer } from 'utils/redux/injectors';

export function configureAppStore() {
  const middlewares = [];

  const enhancers = [createInjectorsEnhancer(createReducer)] as StoreEnhancer[];

  const store = configureStore({
    reducer: createReducer(),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });

  return store;
}
