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
        baseUrl: 'http://localhost:1337/api',

    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (data) => ({
                url: `/products?populate=*`,
                method: 'GET',
                headers: {'Authorization': 'bearer 9b63bb29e9dc9ac969b0c4ac3b01c7becaeb9bb3c2c534c39b8e3b3cf990a243090e601c4d99c22a60c3a6702daa60560b79ed46dd95ae9410d52ec069c9fcb4699d9cb679fa8c0a3a241611ab622bedf4c34d319b5ccc76ab9de557bc56dab131aec1fca33429922adeaaa77ae3385b9efb4aa87f623bd737e2a4ee0ebe0cc5'}
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