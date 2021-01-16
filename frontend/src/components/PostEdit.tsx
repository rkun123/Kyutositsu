import { Paper, Grid, FormLabel, TextField, Container, Button, Snackbar, makeStyles, Typography } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { createStyles, withStyles } from "@material-ui/styles"
import React, { useState, ChangeEvent } from "react"
import { createRef } from "react"
import { useDispatch } from "react-redux"
import { EditingPost, postPost } from "../store/post"

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: `${theme.spacing(5)}px`
    },
    sendButton: {
        margin: `${theme.spacing(2)}px 0`
    }
}))


function PostEdit() {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [ error, setError] = useState('')
    const [ post, setPost] = useState({
        title: '',
        content: ''
    } as EditingPost)

    const ref = createRef()

    const setPostTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setPost({
            ...post,
            title: e.target.value
        })
    }

    const setPostContent = (e: ChangeEvent<HTMLInputElement>) => {
        setPost({
            ...post,
            content: e.target.value
        })
    }

    const handlePostButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if(post.title !== '' && post.content !== '') {
            dispatch(postPost(post))
            setError('')
        } else {
            setError('Empty field error')
        }
    }

    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Typography variant="h6">New</Typography>
                <form autoComplete="off">
                    <TextField
                        required
                        fullWidth
                        label="Title"
                        onChange={setPostTitle}
                    />
                    <TextField
                        required
                        fullWidth
                        multiline
                        rows={6}
                        label="Content"
                        onChange={setPostContent}
                    />
                </form>
                <Button
                    className={classes.sendButton}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handlePostButton}
                >
                    送信
                </Button>
            </Container>
            <Snackbar
                ref={ref}
                open={error !== ''}
                autoHideDuration={5000}
            >
                <Alert variant="filled" severity="error">Error</Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default PostEdit