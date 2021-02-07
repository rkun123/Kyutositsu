import { AppThunk } from '../index'
import api from '../../utils/api'
import consumer from '../../utils/actionCableConsumer.js'
import { Notification, setNotifications, pushNotification, expandNotification } from './index'

export const fetchNotifications = (): AppThunk => async (dispatch, getState) => {
    const res = await api.get('/notifications', {})
    if(res.status === 200) {
        const notifications = res.data as Notification[]
        dispatch(setNotifications(notifications))
    }
}

export const subscribeNotifications = (): AppThunk => async (dispatch, getState) => {
    consumer.subscriptions.create({ channel: 'NotificationChannel' }, {
        received: (str: string) => {
            const data = JSON.parse(str) as Notification
            dispatch(pushNotification(data))
            dispatch(expandNotification(data))
        }
    })
}