import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
