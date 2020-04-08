import { createSlice, configureStore, applyMiddleware } from '@reduxjs/toolkit'
import getApiFetcher from './getApifetcher'
import { cocktailAPI } from './cocktailAPI'
export const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1
  }
})

export const store = configureStore({ reducer: counterSlice.reducer })
