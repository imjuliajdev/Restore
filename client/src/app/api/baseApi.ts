import {BaseQueryApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { startLoading, stopLoading } from '../layout/uiSlice';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api',
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const baseQueryWithErrorHandling = async (
    args: string | FetchArgs, 
    api: BaseQueryApi, 
    extraOptions: object
) => {
  
    api.dispatch(startLoading());
    //simulate network latency
    await sleep(1000);
    const result = await baseQuery(args, api, extraOptions);
    api.dispatch(stopLoading());
    if(result.error) {
        const {status, data} = result.error;
        console.log(status, data);
    }
    return result;
}
