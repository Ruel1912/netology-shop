import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../shared/config';
import { STATUS_FAILED, STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED } from '../../shared/constants';

export const fetchProduct = createAsyncThunk('product/fetchProduct', async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/items/${id}`)
  return response.json()
})

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: {},
    status: STATUS_IDLE,
    error: '',
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = STATUS_LOADING
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = STATUS_SUCCEEDED
        state.product = action.payload
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.status = STATUS_FAILED
      })
  },
})

export default productSlice.reducer