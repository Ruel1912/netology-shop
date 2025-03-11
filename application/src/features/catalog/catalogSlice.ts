import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../shared/config';
import { STATUS_FAILED, STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED } from '../../shared/constants';
import { ICategory } from './CatalogCategories';

interface IFetchItemsArgs {
  offset: number | null
  category: number | null
  query: string | null
}

export interface IProduct {
  id: number;
  category: number;
  title: string;
  images: string[];
  price: number;
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  sizes: IProductSize[];
  count?: number;
}

interface IProductSize {
  size: string;
  available: boolean;
}

const DEFAULT_COUNT_PRODUCTS = 6

export const fetchItems = createAsyncThunk(
  'catalog/fetchItems',
  async ({ category, offset, query }: IFetchItemsArgs) => {
    const params = new URLSearchParams();
    if (category !== null) params.append('categoryId', category.toString());
    if (offset !== null) params.append('offset', offset.toString());
    if (query) params.append('q', query.toString());

    const response = await fetch(`${API_BASE_URL}/items?${params.toString()}`);
    return response.json();
  }
);

export const fetchCategories = createAsyncThunk('catalog/fetchCategories', async () => {
  const response = await fetch(`${API_BASE_URL}/categories`)
  return response.json()
})

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    items: [] as IProduct[],
    categories: [] as ICategory[],
    status: STATUS_IDLE,
    error: null,
    search: '',
    offset: 0,
    categoryId: null,
    hasMore: false,
    isOpenSearchForm: false
  },
  reducers: {
    toggleCategory: (state, action) => {
      state.categoryId = action.payload
      state.offset = 0;
      state.status = STATUS_IDLE
    },
    toggleSearchForm: (state) => {
      state.isOpenSearchForm = !state.isOpenSearchForm
    },
    increaseOffset: (state) => {
      state.offset = state.offset ? state.offset + DEFAULT_COUNT_PRODUCTS : DEFAULT_COUNT_PRODUCTS
      state.status = STATUS_IDLE
    },
    setQuery: (state, action) => {
      state.search = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = STATUS_LOADING
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = state.offset === 0 ? action.payload : [...state.items, ...action.payload]
        state.hasMore = action.payload.length === 6
        state.status = STATUS_SUCCEEDED
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = STATUS_FAILED
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = STATUS_LOADING
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = [{ id: null, title: 'Все' }, ...action.payload]
        state.status = STATUS_SUCCEEDED
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = STATUS_FAILED
      })
  }
})

export const { toggleCategory, increaseOffset, setQuery, toggleSearchForm } = catalogSlice.actions

export default catalogSlice.reducer