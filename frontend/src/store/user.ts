import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type User = {
    id: number,
    provider: 'discord',
    uid: string,
    name: string,
    image: string,
    email: string
}

const initialState: User = {
    id: 0,
    provider: 'discord',
    uid: '',
    name: '',
    image: '',
    email: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            return action.payload
        }
    }
})

export const actions = userSlice.actions

export default userSlice