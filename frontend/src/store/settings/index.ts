import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Settings = {
    selectedTagIds: number[],
    postTagIds: number[]
}

const initialState = {
    selectedTagIds: [],
    postTagIds: []
} as Settings

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setSetting(state, action: PayloadAction<Settings>) {
            // Without duplicated check. See subscribeChannel()
            return action.payload
        },
        _setSelectedTagIds(state, action: PayloadAction<number[]>) {
            state.selectedTagIds = action.payload
        },
        _setPostTagIds(state, action: PayloadAction<number[]>) {
            state.postTagIds = action.payload
        },
    }
})

export const { setSetting, _setSelectedTagIds, _setPostTagIds } = settingSlice.actions

export default settingSlice