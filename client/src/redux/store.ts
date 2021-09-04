import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authenticatonReducer from './reducers/authenticate';
import modeReducer from './reducers/mode';
import notesReducer from './reducers/notes';

import { persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const reducer = combineReducers({
    auth: authenticatonReducer,
    mode: modeReducer,
    notes: notesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch