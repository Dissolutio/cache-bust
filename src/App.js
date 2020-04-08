import React from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, NavLink } from 'react-router-dom'
import { useCacheBuster } from './useCacheBuster'
import { actions } from './store'

import packageJson from '../package.json';

function App() {

  const dispatch = useDispatch()
  const count = useSelector((state) => {
    return state.counter
  })
  const cocktails = useSelector((state) => {
    return state.cocktails
  })
  const cocktailsArr = Object.values(cocktails)

  const handleIncrement = () => {
    dispatch(actions.increment())
  }
  const handleDecrement = () => {
    dispatch(actions.decrement())
  }
  const handleFetchCocktail = () => {
    dispatch(actions.fetchCocktail())
  }

  return (
    <div>
      <nav>
        <NavLink exact style={{ display: 'block' }} activeStyle={{ fontWeight: '700', color: 'red' }} to="/">HOME</NavLink>
        <NavLink style={{ display: 'block' }} activeStyle={{ fontWeight: '700', color: 'red' }} to="/about">ABOUT</NavLink>
        <NavLink style={{ display: 'block' }} activeStyle={{ fontWeight: '700', color: 'red' }} to="/help">HELP</NavLink>
      </nav>

      <div>
        <h2>COCKTAILS</h2>
        <button onClick={handleFetchCocktail}>Get another cocktail</button>
        <ul>
          {cocktailsArr.map(cocktail => {
            return (
              <li key={cocktail.idDrink}>{cocktail.strDrink}</li>
            )
          })}
        </ul>
      </div>

      <div>
        <h2 >COUNT: {count}</h2>
        <button style={{ display: 'block' }} onClick={handleIncrement}>INC</button>
        <button style={{ display: 'block' }} onClick={handleDecrement}>DEC</button>
      </div>


      <Switch>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
      </Switch>
    </div>

  );
}

function AboutPage() {
  const deploymentHash = useCacheBuster()
  global.appVersion = packageJson.version;
  global.deploymentHash = deploymentHash
  const appVersion = packageJson.version;
  return (
    <>
      <h1>About Page</h1>
      <p>About the Cache Buster!</p>
      <ul>
        <li>App version: {appVersion}</li>
        <li>App deployment hash: {deploymentHash}</li>
      </ul>
    </>
  )
}

function HelpPage() {
  return (
    <h1>Help Page</h1>
  )
}

export default App;
