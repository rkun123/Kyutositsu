import { IconButton, Menu, MenuItem, makeStyles } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteIcon from '@material-ui/icons/Delete'
import { Fragment, MouseEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { Post, postDeletePost } from '../store/post'

type Props = {
    post: Post
}

const useStyles = makeStyles((theme) => ({
    menuButton: {
        padding: 'none'
    }
}))

function PostContextMenu({ post }: Props) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const user = useSelector((state: RootState) => state.user.user)

    const [buttonRef, setButtonRef] = useState<null | HTMLButtonElement>()

    const [ open, setOpen ] = useState(false)

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        setOpen(true)
        setButtonRef(e.currentTarget)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDeletePost = () => {
        dispatch(postDeletePost(post.id))
    }

    return (
        <Fragment>
            <IconButton onClick={handleClick} size="small" className={classes.menuButton}>
                <MoreVertIcon></MoreVertIcon>
            </IconButton>
            <Menu
                keepMounted
                open={open}
                onClose={handleClose}
                anchorEl={buttonRef}
                >
                    {
                        post.user.id === user.id ?
                        <MenuItem onClick={handleDeletePost}>
                            <DeleteIcon></DeleteIcon>
                            Delete
                        </MenuItem>
                        : undefined
                    }
                </Menu>
        </Fragment>
    )

}

export default PostContextMenu