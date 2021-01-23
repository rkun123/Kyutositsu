import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppThunk } from './index'
import { fetchUser } from './user'
import { fetchTags } from './tag'
import { fetchSetting } from './settings/thunkActions'


export type Auth = {
    authToken: string,
    client: string,
    uid: string
}

const initialState = {
    authToken: '',
    client: '',
    uid: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<Auth>) {
            console.log('setAuth', action.payload)
            return action.payload
        }
    }
})

export const { setAuth } = authSlice.actions

export const initAuth = (auth: Auth): AppThunk => async (dispatch, getState) => {
    await dispatch(setAuth(auth))
    await dispatch(fetchUser())
    await dispatch(fetchTags())
    await dispatch(fetchSetting())
}

export default authSlice