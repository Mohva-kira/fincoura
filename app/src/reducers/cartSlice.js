    import { createSlice } from '@reduxjs/toolkit'
    import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


    const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []
    const totalAmount = localStorage.getItem('totalAmount') !== null ? JSON.parse(localStorage.getItem('totalAmount')) : 0
    const totalQuantity = localStorage.getItem('totalQuantity') !== null ? JSON.parse(localStorage.getItem('totalQuantity')) : 0

    const drupalOrder = localStorage.getItem('drupalOrder') !== null ? JSON.parse(localStorage.getItem('drupalOrder')) : {}

   
    const user = JSON.parse(localStorage.getItem('user'))

    console.log('localstorage user', user)
    const accessToken = user ? user.jwt : ""
    const setItemFunc = (item, totalAmount, totalQuantity) => {
        localStorage.setItem('cartItems', JSON.stringify(item))
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))

    }

    const initialState = {
        cartItems: items,
        totalAmount: totalAmount,
        totalQuantity: totalQuantity,
        drupalCart: drupalOrder
    }

    const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload
            const existingItem= state.cartItems.find((item)=> item.id === newItem.id )
            state.totalQuantity++

            if(!existingItem){
                state.cartItems.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    imgID: newItem.imgID,
                    price: newItem.price, 
                    quantity: 1,
                    totalPrice: newItem.price,
                    type: newItem.type
                })
            } else {
                existingItem.quantity++
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
            }
            state.totalAmount = state.cartItems.reduce((total, item ) => total + Number(item.price * Number(item.quantity)), 0)

            setItemFunc(state.cartItems.map(item=>item),state.totalAmount, state.totalQuantity)
        
        },

        deleteItem: (state, action) => {
            const id = action.payload
            const existingItem = state.cartItems.find(item => item.id === id)

            if(existingItem){
                state.cartItems = state.cartItems.filter(item => item.id !== id)
                state.totalQuantity = state.totalQuantity -existingItem.quantity
            }
            
            state.totalAmount = state.cartItems.reduce((total, item ) => total + Number(item.price * Number(item.quantity)), 0)
            setItemFunc(state.cartItems.map(item=>item),state.totalAmount, state.totalQuantity)
        }
    }, 

    extraReducers(builder) {
        builder.addMatcher(cartApi.endpoints.addToCart.matchFulfilled, (state, action) =>  {
            console.log('cart payload', action.payload)
            state.drupalCart = action.payload.data
        
                console.log('token', accessToken)
        }),
        builder.addMatcher(cartApi.endpoints.getCarts.matchFulfilled, (state, action) =>  {
            console.log('carts payload', action.payload)
        

        })
    }
    });

    export const cartApi = createApi({
        reducerPath: 'cartApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'http://141.94.204.155:1337/api',
            prepareHeaders: (headers, { getState }) => {
            
            
                // If we have a token set in state, let's assume that we should be passing it.
                if (accessToken) {
                headers.set('Authorization', `Bearer ${user.jwt}` )
                headers.set('Content-Type', "application/json")
         
                }
            
                return headers
            },
            credentials: 'include', // This allows server to set cookies

        }),
        endpoints:(builder) =>  ({
            addToCart: builder.mutation({
                query: (data) => ({
                    url: `/orders`,
                    body: data,
                    method: 'POST',
                    
                
                    
                })
            }),

            getCarts: builder.query({
                query: () => ({
                    url: '/orders',
                    headers: {'Content-Type': 'application/json'}
                })
            }),

            placeOrder: builder.query({
                query: (data, bodyData) =>  ({
                    url: `/checkout/${data}/payment/approve`,
                   body: bodyData 
                })
            }),

            checkoutOrder: builder.mutation({
                query: (data) =>  ({
                    url: `/checkout/${data.orderId}`,
                   body: data.bodyData,
                   method: 'PATCH'
                })
            })
        })

    })

    export const cartActions = cartSlice.actions

    export default cartSlice.reducer
    export const { useAddToCartMutation, useGetCartsQuery, usePlaceOrderQuery, useCheckoutOrderMutation } = cartApi