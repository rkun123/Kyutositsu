import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { makeStyles } from '@material-ui/core'
import { Notification as NotificationType, expandNotification, closeNotification } from '../../store/notifications/index'
import NotificationPopup from './NotificationPopup'

type Props = {
    notification: NotificationType
}

const useStyles = makeStyles((theme) => ({
    notification: {
        marginRight: theme.spacing(2),
        color: theme.palette.grey[300],
        cursor: 'pointer'
    }
}))

export default function Notification( { notification }: Props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const anchor = useRef(null)

    const handleClickButton = (e: any) => {
        if(notification.expand)
            dispatch(closeNotification(notification))
        else
            dispatch(expandNotification(notification))
    }
    const handleClose = (e: any) => {
        dispatch(closeNotification(notification))
        
    }

    return (
        <React.Fragment>
            <div ref={anchor} onClick={handleClickButton} className={classes.notification}>
                <FavoriteIcon />
            </div>
            <NotificationPopup anchor={anchor} notification={notification} open={notification.expand} close={handleClose}/>
        </React.Fragment>
    )
}