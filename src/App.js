import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { useCacheBuster } from './useCacheBuster'
import packageJson from '../package.json';


global.appVersion = packageJson.version;

function App() {
  const deploymentHash = useCacheBuster()
  global.deploymentHash = deploymentHash
  const appVersion = packageJson.version;
  return (
    <div>
      <nav>
        <Link style={{ display: 'block' }} to="/about">ABOUT</Link>
        <Link style={{ display: 'block' }} to="/help">HELP</Link>
      </nav>
      <h1 style={{ marginTop: '2rem' }}>{appVersion}</h1>
      <h2 style={{ marginTop: '2rem' }}>{deploymentHash}</h2>
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
