import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../reducers/products'
import { productsApi } from '../reducers/products'
import { cartApi } from '../reducers/cartSlice'
 
import cartSlice from '../reducers/cartSlice'

import authSlice, {authAPI} from '../reducers/authSlice'


export default configureStore({
  reducer: {
    products: productsReducer,

    cart: cartSlice,
    user: authSlice,
    [cartApi.reducerPath]: cartApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authAPI.reducerPath]: authAPI.reducer

    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      productsApi.middleware,
      cartApi.middleware,
      authAPI.middleware
    ),
  devTools: true,
})