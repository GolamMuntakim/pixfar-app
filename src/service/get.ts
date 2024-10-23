import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface PostProducts{
    "id" : number,
    "title":string,
    "price" : number,
    "description" : string,
    "category" : string,
    "image" : string,
    "rating" : object,
    "rate" : number,
    "count" : number
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/products/' }),
  tagTypes:['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<PostProducts[], {page?: number}>({
      query: ({page = 1}) => `?limit=20&page=${page}`,
    }),
  }),
})


export const { useGetProductsQuery } = productApi