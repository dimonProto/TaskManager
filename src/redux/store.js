import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { sectionReducer } from './slices/sectionSlice';
import { appReducer } from './slices/appSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage
};
const rootReducer = combineReducers({
	section: sectionReducer,
	modal: appReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer
});

export const persistor = persistStore(store);
