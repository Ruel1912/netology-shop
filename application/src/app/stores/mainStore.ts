import { configureStore } from '@reduxjs/toolkit'
import topSalesReducer from '../../features/topSales/topSalesSlice'
import catalogReducer from '../../features/catalog/catalogSlice'
import productReducer from '../../features/product/productSlice'
import cartReducer from '../../features/cart/cartSlice'


export const mainStore = configureStore({
  reducer: {
    topSales: topSalesReducer,
    catalog: catalogReducer,
    product: productReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof mainStore.getState>
export type AppDispatch = typeof mainStore.dispatch
