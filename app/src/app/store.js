import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../reducers/products'
import { productsApi } from '../reducers/products'
import { cartApi } from '../reducers/cartSlice'
 
import cartSlice from '../reducers/cartSlice'

import authSlice, {authAPI} from '../reducers/authSlice'
import paymentSlice, { paymentApi } from '../reducers/payment'


export default configureStore({
  reducer: {
    products: productsReducer,
    cart: cartSlice,
    user: authSlice,
    payData: paymentSlice,
    [cartApi.reducerPath]: cartApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,

    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      productsApi.middleware,
      cartApi.middleware,
      authAPI.middleware,
      paymentApi.middleware,
    ),
  devTools: true,
})