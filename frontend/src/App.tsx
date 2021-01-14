import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RootState } from './store/index'
import Callback from './pages/Callback'
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state: RootState) => state.user)

  return (
    <div className="App">
      <header className="App-header">
        <h1>C3SNS</h1>
        <a href="http://localhost:3000/api/v1/auth/discord?auth_origin_url=http://localhost:3001/callback">Discord Login</a>
        <img src={user.image}></img>
      </header>
      <Router>
        <Switch>
          <Route path="/callback"><Callback /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
