import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppThunk } from './index'
import { fetchUser } from './user'

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
            return action.payload
        }
    }
})

export const { setAuth } = authSlice.actions

export const getAuthAndFetchUser = (auth: Auth): AppThunk => async (dispatch, getState) => {
    dispatch(setAuth(auth))
    dispatch(fetchUser())
}

export default authSlice