import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authenticatonReducer from './reducers/authenticate';
import modeReducer from './reducers/mode';

import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const reducer = combineReducers({
    auth: authenticatonReducer,
    mode: modeReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch