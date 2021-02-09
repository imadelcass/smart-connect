import React from 'react';
import Auth from './Auth';
import Header from './Header';
import Signup from './Signup';
import './style/App.css';
import Home from './Home';
import { NameProvider } from './context';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
function App() {
  return (
    <NameProvider>
      <Router>
        <div className="App">
          <Switch>
          <Route path="/login">
              <Header />
              <Auth />
          </Route>
          <Route path="/signup">
              <Header />
              <Signup />
          </Route>
          <Route path="/">
              <Header />
              <Home />
          </Route>
          </Switch>
        </div>
      </Router>
    </NameProvider>
  );
}
export default App;
