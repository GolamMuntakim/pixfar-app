import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productApi } from '../service/get';
import cartReducer from '../feature/cartSlice'


export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    cart : cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware]),
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
