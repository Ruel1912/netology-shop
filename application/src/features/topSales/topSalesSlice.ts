import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_BASE_URL } from '../../shared/config'

import './topSales.css'
import { STATUS_FAILED, STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED } from '../../shared/constants'

export const fetchTopSales = createAsyncThunk('topSales/fetchTopSales', async () => {
  const response = await fetch(`${API_BASE_URL}/top-sales`)
  return response.json()
})

export const topSalesSlice = createSlice({
  name: 'topSales',
  initialState: {
    topSales: [],
    status: STATUS_IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.pending, (state) => {
        state.status = STATUS_LOADING
      })
      .addCase(fetchTopSales.fulfilled, (state, action) => {
        state.status = STATUS_SUCCEEDED
        state.topSales = action.payload
      })
      .addCase(fetchTopSales.rejected, (state) => {
        state.status = STATUS_FAILED
      })
  },
})

export default topSalesSlice.reducer