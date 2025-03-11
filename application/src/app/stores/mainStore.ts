import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import topSalesReducer from '../../features/topSales/topSalesSlice'
import catalogReducer from '../../features/catalog/catalogSlice'
import productReducer from '../../features/product/productSlice'
import cartReducer from '../../features/cart/cartSlice'
import { combineReducers } from 'redux'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
}

const rootReducer = combineReducers({
  topSales: topSalesReducer,
  catalog: catalogReducer,
  product: productReducer,
  cart: cartReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const mainStore = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(mainStore)

export type RootState = ReturnType<typeof mainStore.getState>
export type AppDispatch = typeof mainStore.dispatch