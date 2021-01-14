import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from './store/index'
import Callback from './pages/Callback'

function App() {
  const [ avatarURL, setAvatarURL ] = useState<string>('')

  useEffect(() => {
    store.subscribe(() => {
      setAvatarURL(store.getState().user.image)
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>C3SNS</h1>
        <a href="http://localhost:3000/api/v1/auth/discord?auth_origin_url=http://localhost:3001/callback">Discord Login</a>
        <img src={avatarURL}></img>
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
