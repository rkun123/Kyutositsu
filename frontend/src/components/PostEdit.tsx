import { TextField, Container, Button, makeStyles, Typography, FormControl, InputLabel, Select, Chip, MenuItem, Grid, LinearProgress, Box, FormHelperText } from "@material-ui/core"
import { ColorPicker } from 'material-ui-color'
import React, { useState, ChangeEvent, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { postPost, setEditingPostContent, setEditingPostColor, setEditingPostTagIds, initEditingPost } from "../store/post"
import { Tag } from "../store/tag"
import { notify } from '../store/ui'
import TagEditor from './TagEditor'
import AssetsEdit from './assets/AssetsEdit'
import AssetsList from './assets/AssetsList'

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
    },
    defaultFileButton: {
        display: 'none',
        position: 'absolute',
        appearance: 'none'
    }
}))


function PostEdit() {
    const classes = useStyles()
    const dispatch = useDispatch()

    const tags = useSelector((state: RootState) => (state.tag.tags))
    const edit = useSelector((state: RootState) => (state.post.edit))

    const [ contentLengthError, setContentLengthError] = useState<boolean>(true)

    const tagById = (id: number) => tags.find((tag) => (tag.id === id))

    const setPostContent = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setEditingPostContent(e.target.value))
    }

    const setPostColor = (e: any) => {
        dispatch(setEditingPostColor('#' + e.hex))
    }

    const handlePostHotKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if(e.ctrlKey && e.key === 'Enter')
        handlePostButton()
    }

    const handleChangeTags = (e: React.ChangeEvent<{value: unknown}>) => {
        const tag_ids = e.target.value as number[]
        dispatch(setEditingPostTagIds(tag_ids))
    }

    const handlePostButton = (): void => {
        if(edit.content === '') {
            dispatch(notify({
                message: 'Empty content error',
                severity: 'error',
                duration: 3000
            }))
            return
        }
        if(edit.tag_ids.length === 0) {
            dispatch(notify({
                message: 'Empty tags error',
                severity: 'error',
                duration: 3000
            }))
            return
        }
        dispatch(postPost(edit))
        dispatch(initEditingPost())
    }

    useEffect(() => {
        if(edit.content.length > postMaxLetters) setContentLengthError(true)
        else setContentLengthError(false)
    }, [edit.content])

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
                                value={edit.tag_ids}
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
                            <ColorPicker
                                defaultValue="red"
                                hideTextfield
                                value={edit.color}
                                disableAlpha={true}
                                onChange={setPostColor}
                            />
                        </Grid>
                        <TextField
                            required
                            fullWidth
                            multiline
                            rows={6}
                            label="Content"
                            value={edit.content}
                            onChange={setPostContent}
                            onKeyDown={handlePostHotKey}
                        />
                    </FormControl>
                    <Box display="flex" alignItems="center" mt={2}>
                        <Box width="100%" mr={1}>
                            <LinearProgress variant="determinate" value={edit.content.length / postMaxLetters * 100} />
                        </Box>
                        <Box>
                            <Typography variant="body2">{edit.content.length}</Typography>
                        </Box>
                    </Box>
                    <AssetsEdit />
                    <AssetsList />
                </form>
                <Box display="flex" alignItems="center">
                    <Box>
                        <Button
                            className={classes.sendButton}
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => {handlePostButton()}}
                            disabled={contentLengthError ? true : false}
                        >
                            送信
                        </Button>
                    </Box>
                    <Box ml={2}>
                        {
                            contentLengthError
                            ? <FormHelperText><span style={{color: 'red'}}>{ edit.content.length }</span> / {postMaxLetters}</FormHelperText>
                            : undefined
                        }
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default PostEdit