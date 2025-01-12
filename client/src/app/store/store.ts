import {configureStore} from '@reduxjs/toolkit';
import {catalogApi} from '../../features/catalog/catalogApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { uiSlice } from '../layout/uiSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { errorApi } from '../../features/about/errorApi';
import { cartApi } from '../../features/cart/cartApi';
import { blogApi } from '../../features/blog/blogApi';
import { catalogSlice } from '../../features/catalog/catalogSlice';

export const store = configureStore({
    reducer: {
        [catalogApi.reducerPath]: catalogApi.reducer,
        [errorApi.reducerPath]: errorApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        ui: uiSlice.reducer,
        catalog: catalogSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            catalogApi.middleware,
            errorApi.middleware,
            cartApi.middleware,
            blogApi.middleware),

});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()