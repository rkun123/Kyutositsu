import { TextField, Container, Button, Snackbar, makeStyles, Typography, FormControl, InputLabel, Select, Chip, MenuItem, Grid, LinearProgress, Box, FormHelperText } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React, { useState, ChangeEvent } from "react"
import { createRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { EditingPost, postPost } from "../store/post"
import { Tag } from "../store/tag"
import TagEditor from './TagEditor'

const postMaxLetters = 200

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
    const apiError = useSelector((state: RootState) => (state.post.error))
    const tag_ids = useSelector((state: RootState) => (state.settings.postTagIds))

    const [ error, setError] = useState('')
    const [ contentLengthError, setContentLengthError] = useState<boolean>(true)
    const [content, setContent] = useState('')
    const [tagIds, setTagIds] = useState([] as number[])

    const ref = createRef()

    const tagById = (id: number) => tags.find((tag) => (tag.id === id))

    const setPostContent = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value)
    }

    const handleChangeTags = (e: React.ChangeEvent<{value: unknown}>) => {
        const tag_ids = e.target.value as number[]
        setTagIds(tag_ids)
    }

    const handlePostButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if(content === '') {
            setError("Empty content error")
            return
        }
        if(tagIds.length === 0) {
            setError("Empty tags error")
            return
        }
        setError('')
        const post = {
            content,
            tag_ids: tagIds
        } as EditingPost
        dispatch(postPost(post))

        if(apiError === null) setContent('')
    }

    useEffect(() => {
        setTagIds(tag_ids)
    }, [tag_ids])

    useEffect(() => {
        if(content.length > postMaxLetters) setContentLengthError(true)
        else setContentLengthError(false)
    }, [content])

    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Typography variant="h6">New</Typography>
                <form autoComplete="off">
                    <FormControl>
                        <Grid direction="row" alignItems="center">
                            <InputLabel>Tags</InputLabel>
                            <Select
                                multiple
                                value={tagIds}
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
                            <TagEditor />
                        </Grid>
                        <TextField
                            required
                            fullWidth
                            multiline
                            rows={6}
                            label="Content"
                            value={content}
                            onChange={setPostContent}
                        />
                    </FormControl>
                </form>
                <Box display="flex" alignItems="center" mt={2}>
                    <Box width="100%" mr={1}>
                        <LinearProgress variant="determinate" value={content.length / postMaxLetters * 100} />
                    </Box>
                    <Box>
                        <Typography variant="body2">{content.length}</Typography>
                    </Box>
                </Box>
                <Box display="flex" alignItems="center">
                    <Box>
                        <Button
                            className={classes.sendButton}
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handlePostButton}
                            disabled={contentLengthError ? true : false}
                        >
                            送信
                        </Button>
                    </Box>
                    <Box ml={2}>
                        {
                            contentLengthError ? 
                            <FormHelperText><span style={{color: 'red'}}>{ content.length }</span> / {postMaxLetters}</FormHelperText>
                            :undefined
                        }
                    </Box>
                </Box>
            </Container>
            <Snackbar
                ref={ref}
                open={error !== ''}
                autoHideDuration={5000}
            >
                <Alert variant="filled" severity="error">{error}</Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default PostEdit