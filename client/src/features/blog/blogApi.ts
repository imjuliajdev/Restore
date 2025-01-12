import {createApi} from '@reduxjs/toolkit/query/react';
import { Blog } from '../../app/models/blog';
import { baseQueryWithErrorHandling } from '../../app/api/baseApi';

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchBlogPosts: builder.query<Blog[], void>({
            query: () => ({url: 'blog'}),
                }),
        fetchBlogPostDetails: builder.query<Blog, number>({
            query: (blogPostId) => ({url: `blog/${blogPostId}`
            }),
        }),
    }),
});

export const {
    useFetchBlogPostsQuery, 
    useFetchBlogPostDetailsQuery
} = blogApi;

