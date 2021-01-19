import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppThunk } from './index'
import { fetchPost } from './post'
import { fetchUser } from './user'
import { fetchTags } from './tag'


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
    dispatch(setAuth(auth))
    dispatch(fetchUser())
    dispatch(fetchPost(false))
    dispatch(fetchTags())
}

export default authSlice