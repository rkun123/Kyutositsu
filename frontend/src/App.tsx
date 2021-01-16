import React, { useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RootState } from './store/index'
import Callback from './pages/Callback'
import Home from './pages/Home'
import Drawer from './components/Drawer'
import { useDispatch, useSelector } from 'react-redux';
import { Auth, setAuth, initAuth } from './store/auth'
import { CssBaseline, AppBar, makeStyles, Toolbar, Typography, Button, Avatar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { openDrawer } from './store/ui';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh'
  },
  appBar: {
    position: 'fixed',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  title: {
    flexGrow: 1
  }
}))

function App() {
  const auth = useSelector((state: RootState) => state.auth)
  const userState = useSelector((state: RootState) => state.user)
  const isDrawerOpen = useSelector((state: RootState) => state.ui.isDrawerOpen)
  const classes = useStyle()
  const dispatch = useDispatch()

  const handleOpenDrawer = () => {
    dispatch(openDrawer())
  }

  const getAuthFromLocalstorage = () => {
    const localstorageAuthStr = window.localStorage.getItem('sns_auth')
    if(localstorageAuthStr !== null && localstorageAuthStr !== '') {
      const localstorageAuth = JSON.parse(localstorageAuthStr) as Auth
      console.log('localstorageSNSAuth', localstorageAuth)
      //dispatch(setAuth(localstorageSNSAuth))
      dispatch(initAuth(localstorageAuth))
    }
  }

  useEffect(() => {
    //if(auth.authToken === '') getAuthFromLocalstorage()
    getAuthFromLocalstorage()
  }, [dispatch])

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
    <div className={"App " + classes.root}>
      <CssBaseline />
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleOpenDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title}>
            C3SNS
          </Typography>
          {loginButton()}
          <Avatar src={userState.user.image}></Avatar>
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawerOpen} />
      <div>
        <div className={classes.drawerHeader}></div>
        <Router>
          <Switch>
            <Route path="/callback"><Callback /></Route>
            <Route path="/"><Home /></Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
