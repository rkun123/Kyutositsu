import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit'

export type ChannelEntry = {
    tag_id: number,
    channel: any
}
export type Subscribes = {
    channels: ChannelEntry[]
}

const initialState = {
    channels: []
} as Subscribes

const subscribesSlice = createSlice({
    name: 'subscribes',
    initialState,
    reducers: {
        addChannel(state, action: PayloadAction<ChannelEntry>) {
            // Without duplicated check. See subscribeChannel()
            state.channels.push(action.payload)
            return state
        },
        deleteChannel(state, action: PayloadAction<number>) {
            // Without not existing check. See unSubscribeChannel()
            const idx = state.channels.findIndex((channelEntry) => (channelEntry.tag_id === action.payload))
            state.channels.splice(idx, 1)
        },
        clearChannels(state, action: Action) {
            state.channels = []
        }
    }
})

export const { addChannel, clearChannels, deleteChannel } = subscribesSlice.actions

export default subscribesSlice
