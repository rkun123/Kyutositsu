import React, { useEffect, useCallback } from 'react';
import clsx from 'clsx'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RootState } from './store/index'
import Callback from './pages/Callback'
import Home from './pages/Home'
import Drawer from './components/Drawer'
import { useDispatch, useSelector } from 'react-redux';
import { Auth, initAuth } from './store/auth'
import { CssBaseline, AppBar, makeStyles, Toolbar, Typography, Button, Avatar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { closeDrawer, openDrawer } from './store/ui';


const frontendURL = process.env.REACT_APP_URL || 'http://localhost:3001'
const callbackURL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/discord?auth_origin_url=${frontendURL}/callback`

type StyleProps = {
  drawerWidth: number
}

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    //backgroundColor: theme.palette.background.default,
    backgroundColor: 'grey',
    minHeight: '100vh'
  },
  home: {
    width: '100%'
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
  drawerSpaceOn: {
    marginLeft: (props: StyleProps) => props.drawerWidth
  },
  drawerSpace: {
    transition: 'margin-left 255ms cubic-bezier(0, 0, 0.2, 1) 0ms'
  },
  title: {
    flexGrow: 1
  }
}))

function App() {
  const userState = useSelector((state: RootState) => state.user)
  const drawerWidth = useSelector((state: RootState) => state.ui.drawerWidth)
  const isDrawerOpen = useSelector((state: RootState) => state.ui.isDrawerOpen)
  const classes = useStyle({ drawerWidth })
  const dispatch = useDispatch()

  const handleDrawerToggle = () => {
    if(isDrawerOpen) dispatch(closeDrawer())
    else dispatch(openDrawer())
  }

  const getAuthFromLocalstorage = useCallback(() => {
    const localstorageAuthStr = window.localStorage.getItem('sns_auth')
    if(localstorageAuthStr !== null && localstorageAuthStr !== '') {
      const localstorageAuth = JSON.parse(localstorageAuthStr) as Auth
      console.log('localstorageSNSAuth', localstorageAuth)
      //dispatch(setAuth(localstorageSNSAuth))
      dispatch(initAuth(localstorageAuth))
    }
  }, [dispatch])

  useEffect(() => {
    //if(auth.authToken === '') getAuthFromLocalstorage()
    getAuthFromLocalstorage()
  }, [getAuthFromLocalstorage])

  const loginButton = () => {
    if(!userState.success) {
      return (
        <Button color="inherit" href={callbackURL}>
          Login
        </Button>
      )
    }
  }

  return (
    <div className={clsx("App", classes.root, classes.drawerSpace, isDrawerOpen ? classes.drawerSpaceOn : undefined)}>
      <CssBaseline />
      <AppBar position="static" color="default" className={classes.appBar}>
        <div>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.title}>
              C3SNS
            </Typography>
            {loginButton()}
            <Avatar src={userState.user.image}></Avatar>
          </Toolbar>
        </div>
      </AppBar>
      <Drawer open={isDrawerOpen} />
      <div className={classes.home}>
        <div className={classes.drawerHeader}></div>
        <div className={classes.home}>
        <Router>
          <Switch>
            <Route path="/callback"><Callback /></Route>
            <Route path="/"><Home /></Route>
          </Switch>
        </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
