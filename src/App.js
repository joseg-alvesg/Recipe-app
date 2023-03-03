import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import SearchProvider from './contexts/SearchProvider';
import Drinks from './pages/Drinks';
import Login from './pages/Login';
import Meals from './pages/Meals';

function App() {
  return (
    <SearchProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
      </Switch>
    </SearchProvider>

  );
}

export default App;
