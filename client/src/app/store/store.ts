import {configureStore} from '@reduxjs/toolkit';
import {catalogApi} from '../../features/catalog/catalogApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { uiSlice } from '../layout/uiSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        [catalogApi.reducerPath]: catalogApi.reducer,
        ui: uiSlice.reducer,
    },
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(catalogApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()