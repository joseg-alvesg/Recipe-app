import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Drinks from './pages/Drinks';
import Meals from './pages/Meals';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
