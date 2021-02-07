import { useEffect } from 'react'
import { RootState } from '../../store/index'
import { Notification as NotificationType } from '../../store/notifications/index'
import { useSelector } from 'react-redux'
import { makeStyles, Box } from '@material-ui/core'
import Notification from './Notification'

const useStyles = makeStyles((theme) => ({
    timeline: {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(3),
        backgroundColor: theme.palette.primary.dark,
        width: '100%'
    }
}))

export default function NotificationsTimeline() {
    const classes = useStyles()
    const notifications = useSelector((state: RootState) => state.notifications.notifications) as NotificationType[]

    useEffect(() => {
        console.log(notifications)
    }, [notifications])


    return (
        <Box display="flex" flexDirection="row" flexWrap="nowrap" className={classes.timeline}>
            {
                notifications.map((n: NotificationType) => (
                    <Notification notification={n} />
                ))
            }
        </Box>
    )
}
