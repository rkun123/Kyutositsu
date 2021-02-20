import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Notify = {
    message: string,
    severity: 'error' | 'info' | 'success' | 'warning',
    variant?: 'filled' | 'outlined' | 'standard',
    duration: number
}

export type uiState = {
    isDrawerOpen: boolean,
    drawerWidth: number,
    notify: Notify | undefined
}

const initialState = {
    isDrawerOpen: false,
    drawerWidth: 300,
    notify: undefined
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
        notify: (state, action: PayloadAction<Notify>) => {
            state.notify = action.payload
        },
        closeNotify: (state) => {
            state.notify = undefined
            return state
        }
    }
})

export const {
    openDrawer,
    closeDrawer,
    notify,
    closeNotify
} = uiSlice.actions

export default uiSlice