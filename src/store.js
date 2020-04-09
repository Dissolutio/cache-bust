import {
  createSlice,
  configureStore,
  getDefaultMiddleware,
  combineReducers
} from '@reduxjs/toolkit'

import { getRandomCocktail } from './cocktailAPI'
import cherryRum from './sampleCocktails.json'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 1,
  reducers: {
    increment: (state, action) => {
      return state + 1
    },
    decrement: (state, action) => {
      return state - 1
    }
  }
})

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState: {
    cocktails: {
      [cherryRum.idDrink]: cherryRum,
    },
    loading: false,
    error: ''

  },
  reducers: {
    start: (state) => {
      state.loading = true
    },
    fail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    success: (state, action) => {
      state.loading = false
      state.error = ''
      action.payload.forEach(cocktail => {
        state.cocktails[cocktail.idDrink] = cocktail
      })
    },
  }
})

const rootReducer = combineReducers({ counter: counterSlice.reducer, cocktails: cocktailsSlice.reducer })

const onApiError = (error) => {
  if (error.message === '404') {
    store.dispatch(cocktailsSlice.actions.fail('404 CAUGHT BY MIDDLEWARE'))
  } else {
    throw error
  }
}

export const store = configureStore(
  {
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      thunk: {
        extraArgument: {
          getRandomCocktail: getRandomCocktail(onApiError)
        },
      },
      serializableCheck: false
    }),
    devTools: true,
  }
)

// THUNK
const fetchCocktail = () => async (dispatch, getState, extraThunkArg) => {
  dispatch(cocktailsSlice.actions.start())
  try {
    const response = await extraThunkArg.getRandomCocktail()
    if (response === undefined || response === null) {
      return
    }
    dispatch(cocktailsSlice.actions.success(response))
  } catch (error) {
    console.log("THUNK ERROR", error)
    dispatch(cocktailsSlice.actions.fail(error.message))
  }
}

export const actions = {
  increment: counterSlice.actions.increment,
  decrement: counterSlice.actions.decrement,
  fetchCocktail: fetchCocktail,
}
