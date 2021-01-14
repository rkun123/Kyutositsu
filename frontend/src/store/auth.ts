import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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

export const actions = authSlice.actions

export default authSlice