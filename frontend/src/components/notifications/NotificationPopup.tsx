import React, { useState, useEffect } from 'react'
import { Box, Paper, Popper, makeStyles, Chip, Fade } from '@material-ui/core'
import { Favorite, Notification as NotificationType } from '../../store/notifications/index'
import PostCard from '../PostCard'

type Props = {
    notification: NotificationType,
    anchor: React.MutableRefObject<null>
    open: boolean,
    close: Function
}

const useStyles = makeStyles((theme) => ({
    popOverPaper: {
        padding: theme.spacing(1),
        width: '300px',
        listStyle: 'none'
    },
    popOver: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    chip: {
        marginBottom: theme.spacing(1)
    }
}))


export default function Notification( { notification, anchor, open, close }: Props) {
    const classes = useStyles()
    const [ favorite, setFavorite ] = useState<Favorite | null>(null)

    useEffect(() => {
        if(notification.favorite !== null) setFavorite(notification.favorite)
    }, [setFavorite, notification])

    const favoritePop = () => {
        if(favorite !== null) {
            return (
                <Paper onClick={() => {console.info('CLOSE'); close()}} className={classes.popOverPaper}>
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Chip label={`${favorite.post.user.nickname}がいいねしました。`} className={classes.chip}/>
                        <PostCard post={favorite.post} isNotification isSingleColumn></PostCard>
                    </Box>

                </Paper>
            )
        }
    }

    return (
        <Popper open={open} anchorEl={anchor.current} transition className={classes.popOver} modifiers={{
            arrow: {
                enabled: true,
                element: anchor.current
            }
        }}>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps}>
                    {favoritePop()}
                </Fade>
            )}
        </Popper>
    )
}
