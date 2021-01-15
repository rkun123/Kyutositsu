import React, { useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RootState } from './store/index'
import Callback from './pages/Callback'
import Home from './pages/Home'
import { useSelector } from 'react-redux';
import { AppBar, makeStyles, Toolbar, Typography, Button, Avatar, Container } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}))

function App() {
  const userState = useSelector((state: RootState) => state.user)
  const classes = useStyle()

  const loginButton = () => {
    if(!userState.success) {
      return (
        <Button color="inherit" href="http://localhost:3000/api/v1/auth/discord?auth_origin_url=http://localhost:3001/callback">
          Login
        </Button>
      )
    }
  }

  return (
    <div className="App">
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            C3SNS
          </Typography>
          {loginButton()}
          <Avatar src={userState.user.image}></Avatar>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Router>
          <Switch>
            <Route path="/callback"><Callback /></Route>
            <Route path="/"><Home /></Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
