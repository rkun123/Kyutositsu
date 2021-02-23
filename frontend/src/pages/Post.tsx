import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade';
import { setDetailPost } from '../store/post'
import PostDetail from '../components/PostDetail'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

function PostModal() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(true)
    const history = useHistory()

    const handleClose = () => {
        setOpen(false);
        dispatch(setDetailPost(undefined))
        history.push('/')
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <PostDetail />
            </Fade>
        </Modal>
    );
}


function Post() {

    return (
        <React.Fragment>
            <PostModal />
        </React.Fragment>
    )
}

export default Post
