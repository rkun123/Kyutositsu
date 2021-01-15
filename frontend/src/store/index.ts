import { Action, combineReducers, applyMiddleware, createStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { ThunkAction } from 'redux-thunk'
import authSlice from './auth'
import userSlice from './user'

const reducers = combineReducers({
    auth: authSlice.reducer,
    user: userSlice.reducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export type RootState = ReturnType<typeof store.getState>

export default store