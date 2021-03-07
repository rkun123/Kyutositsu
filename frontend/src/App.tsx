import React, { useEffect, useCallback } from 'react';
import clsx from 'clsx'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RootState } from './store/index'
import Home from './pages/Home'
import Post from './pages/Post'
import Drawer from './components/Drawer'
import Notify from './components/Notify'
import { useDispatch, useSelector } from 'react-redux';
import { Auth, initAuth } from './store/auth'
import { CssBaseline, AppBar, makeStyles, Toolbar, Typography, Button, Avatar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { closeDrawer, openDrawer } from './store/ui';
import callbackURL from './utils/callbackURL'
import NotificationsTimeline from './components/notifications/NotificationTimeline'


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
  drawerSpace: {
    transition: 'margin-left 255ms cubic-bezier(0, 0, 0.2, 1) 0ms'
  },
  title: {
    flexGrow: 1
  },
  bottomTimeline: {
    position: 'fixed',
    width: '100%',
    bottom: 0
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
      dispatch(initAuth())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initAuth())
  }, [dispatch])
  useEffect(() => {
    console.log(userState.user.image)
  }, [userState])

  useEffect(() => {
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
    <div className={clsx("App", classes.root, classes.drawerSpace)}>
      <CssBaseline />
      <Notify />
      <Router>
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
            <Home />
            <Switch>
              <Route path="/posts/:post_id" children={<Post />}></Route>
            </Switch>
            <div className={classes.bottomTimeline}>
              <NotificationsTimeline />
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
