import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { current } from "@reduxjs/toolkit";
import { setMessage } from "./message"
import Base64 from "base-64"

const initialState = {
    items: {},
    status: 'idle',
    error: null
};
// const API_URL = process.env.API_URL;


export const productsApi = createApi({
   
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://admin.fincoura.com/api',

    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (data) => ({
                url: `/products?populate=*`,
                method: 'GET',
               
            }),
        }),
       

    }),
})


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        filterProduct(state) {

        }
    },


    extraReducers(builder) {
        builder.addMatcher(productsApi.endpoints.getProducts.matchFulfilled, (state, action) => {
            console.log('payload', action.payload)
            state.items = action.payload
            
        })

      
        // builder.addMatcher(playlistApi.endpoints.addToPlaylist.matchFulfilled, (state: any, action: any) => {
        //     state.playlists.push(action.payload.data)
        // })
    }
});




export default productsSlice.reducer;
export const { useGetProductsQuery } = productsApi;