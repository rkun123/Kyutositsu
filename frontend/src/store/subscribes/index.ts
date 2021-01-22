import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit'

export type Subscribes = {
    channels: any[]
}

const initialState = {
    channels: []
} as Subscribes

const subscribesSlice = createSlice({
    name: 'subscribes',
    initialState,
    reducers: {
        addChannel(state, action: PayloadAction<any>) {
            state.channels.push(action.payload)
            return state
        },
        clearChannels(state, action: Action) {
            state.channels = []
        }
    }
})

export const { addChannel, clearChannels } = subscribesSlice.actions

export default subscribesSlice
