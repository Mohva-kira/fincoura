import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const initialState = {
    user: {},
   }

   


   const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },

    extraReducers(builder) {
        builder.addMatcher(authAPI.endpoints.signUp.matchFulfilled, (state, action) =>  {
            console.log('user payload', action.payload)
           
        }),
        builder.addMatcher(authAPI.endpoints.login.matchFulfilled, (state, action) =>  {
            console.log('user logged-in payload', action.payload)
            state.user = action.payload
           
        }),
        builder.addMatcher(authAPI.endpoints.getToken.matchFulfilled, (state, action) =>  {
            console.log('user token fetched', action)
            state.user.tokens = action.payload
           
        })
      }

   })


   export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:1337/api'}),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data) => ({
                url: '/auth/local/register',
                body: data,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                  },
                
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/local',
                body: data,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                  },
                
            })
        }),
        getToken: builder.mutation({
            query: (data) => ({
                url: `/oauth/token`,
                body: data,
                method: 'POST',
              
                
            })
        })
    })
   })


   export default authSlice.reducer
   export const { useSignUpMutation, useLoginMutation, useGetTokenMutation } = authAPI