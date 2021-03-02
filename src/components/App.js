import React from 'react';
import Auth from './Auth';
import Header from './Header';
import Signup from './Signup';
import './style/App.css';
import Home from './Home';
import { NameProvider } from './context';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { EmailProvider } from './EmailContext';
import Profile from './Profile';
function App() {
  return (
    <NameProvider>
        <EmailProvider>
        <Router>
          <div className="App">
            <Switch>
            <Route path="/profile">
                <Header />
                <Profile />
            </Route>
            <Route path="/home">
                <Header />
                <Home />
            </Route>
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
                <Signup />
            </Route>
            </Switch>
          </div>
        </Router>
    </EmailProvider>
      </NameProvider>
  );
}
export default App;
