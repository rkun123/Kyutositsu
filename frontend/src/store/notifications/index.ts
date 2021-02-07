import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../user'
import { Post } from '../post'

export type Favorite = {
    id: number,
    created_at: Date,
    user: User,
    post: Post
}
export type Notification = {
    id: number,
    created_at: Date,
    favorite: Favorite,
    user: User,
    expand: boolean
}

export type NotificationState = {
    notifications: Notification[]
}

const initialState = {
    notifications: []
} as NotificationState

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        pushNotification(state, action: PayloadAction<Notification>) {
            const notification = action.payload
            state.notifications.splice(0, 0, notification)
            notification.expand = true
        },
        setNotifications(state, action: PayloadAction<Notification[]>) {
            state.notifications = action.payload
            return state
        },
        expandNotification(state, action: PayloadAction<Notification>) {
            // Close other notifications
            state.notifications = state.notifications.map((n) => {n.expand = false; return n})
            const idx = state.notifications.findIndex((n) => (n.id === action.payload.id))
            if(idx === -1) return
            state.notifications[idx].expand = true
        },
        closeNotification(state, action: PayloadAction<Notification>) {
            const idx = state.notifications.findIndex((n) => (n.id === action.payload.id))
            if(idx === -1) return
            state.notifications[idx].expand = false
        }
    }
})


export const { pushNotification, setNotifications, expandNotification, closeNotification } = notificationSlice.actions

export default notificationSlice