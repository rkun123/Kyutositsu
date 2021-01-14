import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'
import userSlice from './user'

const reducers = combineReducers({
    auth: authSlice.reducer,
    user: userSlice.reducer
})

const store = configureStore({
    reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>
export default store