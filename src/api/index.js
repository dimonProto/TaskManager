import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiEndpoint ='http://localhost:5000';

export const myApi = createApi({
    reducerPath: 'myApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiEndpoint }),
    endpoints: builder => ({
        getFileById: builder.query({
    query: arg => {
        const { id, fileId } = arg;
        return `/some/endpoint/with/two/${id}/pathvariables/${fileId}`;
    },
}),
}),
});

// RTK Query will automatically generate hooks for each endpoint query
export const { useGetFileByIdQuery } = myApi;