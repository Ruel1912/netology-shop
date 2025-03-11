import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/stores'
import { IOrder } from './CartOrder'
import { STATUS_FAILED, STATUS_LOADING, STATUS_SUCCEEDED } from '../../shared/constants'
import { API_BASE_URL } from '../../shared/config'

export interface ICart {
  id: number;
  title: string;
  size: string;
  quantity: number;
  price: number;
}

const initialState = {
  items: [] as ICart[],
  status: 'idle',
  completeOrder: false,
  error: '',
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id)

      if (item) {
        item.quantity += action.payload.quantity
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
    },
    toogleCompleteOrder(state) {
      state.completeOrder = !state.completeOrder
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = STATUS_LOADING
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.status = STATUS_SUCCEEDED
      })
      .addCase(postOrder.rejected, (state) => {
        state.status = STATUS_FAILED
      })
  }
})

export const { addItem, removeItem, toogleCompleteOrder } = cartSlice.actions

export const selectCardItems = (state: RootState): ICart[] => state.cart.items
export const selectCardCompleteOrder = (state: RootState): boolean => state.cart.completeOrder
export const selectCardStatus = (state: RootState): string => state.cart.status
export const selectCardError = (state: RootState): string => state.cart.error

export const selectCartTotal = (state: RootState): number => {
  return state.cart.items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
}

export default cartSlice.reducer

export const postOrder = createAsyncThunk(
  'catalog/fetchItems',
  async (order: IOrder) => {

    const response = await fetch(`${API_BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    return response.json();
  }
);
