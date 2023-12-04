import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { current } from "@reduxjs/toolkit";
import { setMessage } from "./message"
import Base64 from "base-64"

const initialState = {
    payData: {},
    status: 'idle',
    error: null
};
// const API_URL = process.env.API_URL;


export const paymentApi = createApi({
   
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api-gateway.sandbox.ngenius-payments.com/',
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
           
            console.log(getState());
            console.log("HEADERS", headers);
            headers.set("Content-Type", "application/vnd.ni-identity.v1+json");
            headers.set("Authorization", "MmExYzQ4ZGEtYmFmOC00ZDQ3LWFhMjgtNzNhMjM2OWI2NDNhOjBiNmM1YmRiLTAzNDYtNDA0Mi05OTQ0LTkyNTRkMzAxZmRkNg==")
            // if (!headers.has("Authorization") && token) {
            //     headers.set("Authorization", `Bearer ${token}`);
            // }
            return headers;
        },
    
    }),
    
    endpoints: (builder) => ({
        getToken: builder.mutation({
            query: () => ({
                url: `identity/auth/access-token`,
                method: 'POST',
               
            }),
        }),


       

    }),
})  


const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        filterProduct(state) {

        }
    },


    extraReducers(builder) {
        builder.addMatcher(paymentApi.endpoints.getToken.matchFulfilled, (state, action) => {
            console.log('Payement data', action.payload)
            state.payData = action.payload
            
        })

      
        // builder.addMatcher(playlistApi.endpoints.addToPlaylist.matchFulfilled, (state: any, action: any) => {
        //     state.playlists.push(action.payload.data)
        // })
    }
});




export default paymentSlice.reducer;
export const { useGetTokenMutation } = paymentApi;