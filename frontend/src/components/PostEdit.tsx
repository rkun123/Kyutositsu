import { TextField, Container, Button, Snackbar, makeStyles, Typography, FormControl, InputLabel, Select, Chip, MenuItem} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React, { useState, ChangeEvent } from "react"
import { createRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { EditingPost, postPost } from "../store/post"
import { Tag, selectTag } from "../store/tag"

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: `${theme.spacing(5)}px`
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    tag: {
        marginRight: theme.spacing(0.5)
    },
    sendButton: {
        margin: `${theme.spacing(2)}px 0`
    }
}))


function PostEdit() {
    const classes = useStyles()
    const dispatch = useDispatch()

    const tags = useSelector((state: RootState) => (state.tag.tags))

    const [ error, setError] = useState('')
    const [ postTagIds, setPostTagIds] = useState([] as number[])
    const [ post, setPost] = useState({
        content: '',
        tag_ids: []
    } as EditingPost)

    const ref = createRef()

    const tagById = (id: number) => tags.find((tag) => (tag.id === id))

    const setPostContent = (e: ChangeEvent<HTMLInputElement>) => {
        setPost({
            ...post,
            content: e.target.value
        })
    }

    const handleChangeTags = (e: React.ChangeEvent<{value: unknown}>) => {
        const tag_ids = e.target.value as number[]
        setPostTagIds(tag_ids)
        setPost({
            ...post,
            tag_ids
        })
    }

    const handlePostButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if(post.content !== '') {
            post.tag_ids.forEach((tag_id) => {
                const tag = tags.find((tag) => (tag.id === tag_id))
                dispatch(selectTag(tag!))
            })
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
                    <FormControl>
                        <InputLabel>Tags</InputLabel>
                        <Select
                            multiple
                            value={postTagIds}
                            onChange={handleChangeTags}
                            renderValue={(tag_ids) => (
                                <div className={classes.tags}>
                                    {(tag_ids as number[]).map((tag_id) => {
                                        const tag = tagById(tag_id)!
                                        return (<Chip key={tag_id} label={tag.name} className={classes.tag} style={{backgroundColor: tag.color}}/>)
                                    })}
                                </div>
                            )}
                        >
                            {
                                tags.map((tag: Tag) => (
                                    <MenuItem key={tag.id} value={tag.id}>
                                        <Chip label={tag.name} style={{backgroundColor: tag.color}}></Chip>
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
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