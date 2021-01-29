import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from './index'
import api from '../utils/api'


export type User = {
    id: number,
    provider: 'discord',
    uid: string,
    name: string,
    image: string,
    email: string
}

export type UserState = {
    user: User,
    isFetching: boolean,
    success: boolean
}

const initialState = {
    user: {
        id: 0,
        provider: 'discord',
        uid: '',
        name: '',
        image: '',
        email: ''
    },
    isFetching: false,
    success: false
} as UserState

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            return action.payload
        }
    }
})


export const { setUser } = userSlice.actions


export const fetchUser = (): AppThunk => async (dispatch, getState) => {
    const res = await api.get('/users', {})
    if(res.data.success === true) {
        const user = res.data.data as User
        console.info('Success', user)
        dispatch(setUser({
            isFetching: false,
            success: true,
            user
        } as UserState))
    }
}

export default userSlice