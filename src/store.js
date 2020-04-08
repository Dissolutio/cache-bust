import {
  createSlice,
  configureStore,
  getDefaultMiddleware,
  applyMiddleware,
  combineReducers
} from '@reduxjs/toolkit'

import { getApiFetcher } from './getApifetcher'
import { cocktailAPI } from './cocktailAPI'
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
    [cherryRum.idDrink]: cherryRum
  },
  reducers: {
    add: (state, action) => {
      console.log("action", action)
      const newCocktail = action.payload
      state[newCocktail.idDrink] = newCocktail
    },
  }
})

const rootReducer = combineReducers({ counter: counterSlice.reducer, cocktails: cocktailsSlice.reducer })

const customizedMiddleware = getDefaultMiddleware({
  thunk: {
    extraArgument: {
      apiFetch: getApiFetcher(() => {
        console.log(`FAILED AND CAUGHT BY MIDDLEWARE`);
      })
    },
  },
  serializableCheck: false
})

export const store = configureStore(
  {
    reducer: rootReducer,
    middleware: customizedMiddleware,
    devTools: true,
  }
)

const fetchCocktail = () => async (dispatch, getState, extraArg) => {
  try {
    const fetcher = await extraArg.apiFetch
    const response = await fetcher('random.php')
    console.log("fetchCocktail -> response", response)
    // const response = await cocktailAPI.getRandomCocktail()
    const newCocktail = response['0']
    if (!newCocktail) {
      throw new Error(`That ain't a cocktail`)
    }
    dispatch(cocktailsSlice.actions.add(newCocktail))
  } catch (err) {
    console.log("THUNK ERROR", err)
  }
}

export const actions = {
  increment: counterSlice.actions.increment,
  decrement: counterSlice.actions.decrement,
  fetchCocktail: fetchCocktail,
}
