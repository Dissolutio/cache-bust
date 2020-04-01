import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { useCacheBuster } from './useCacheBuster'

function App() {
  useCacheBuster()

  return (
    <div>
      <nav>
        <Link style={{ display: 'block' }} to="/about">ABOUT</Link>
        <Link style={{ display: 'block' }} to="/help">HELP</Link>
      </nav>
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
  return (
    <h1>About Page</h1>
  )
}
function HelpPage() {
  return (
    <h1>Help Page</h1>
  )
}
export default App;
