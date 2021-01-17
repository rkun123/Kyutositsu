import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type uiState = {
    isDrawerOpen: boolean,
    drawerWidth: number
}

const initialState = {
    isDrawerOpen: false,
    drawerWidth: 300
} as uiState

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openDrawer: (state) => {
            state.isDrawerOpen = true
        },
        closeDrawer: (state) => {
            state.isDrawerOpen = false
        },
    }
})

export const {
    openDrawer,
    closeDrawer
} = uiSlice.actions

export default uiSlice