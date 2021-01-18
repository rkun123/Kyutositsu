import { useState } from 'react'
import { Chip, makeStyles, MenuItem, Input, Select, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { Tag, unSelectTag, selectTag } from "../store/tag"
import { fetchPost } from "../store/post"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        margin: 0,
        flexWrap: 'wrap'
    },
    chip: {
        marginRight: theme.spacing(0.5)
    }
}))

function TagSelector() {
    const classes = useStyles()
    const tagState = useSelector((state: RootState) => (state.tag))
    const dispatch = useDispatch()

    const [isSelectShow, setIsSelectShow] = useState(false)

    const handleUnSelectTag = (tag: any) => {
        console.log('delete', tag)
        dispatch(unSelectTag(tag))
        dispatch(fetchPost())
    }

    const handleSelectTag = (e: React.ChangeEvent<{value: unknown}>) => {
        const selectedTag = tagState.tags.find((tag) => (tag.id === e.target.value as number))
        dispatch(selectTag(selectedTag!))
        setIsSelectShow(false)
        // Update all posts
        dispatch(fetchPost())
    }

    return (
        <div className={classes.root}>
            <Chip label="表示するタグ" className={classes.chip}></Chip>
            {tagState.selectedTags.map((tag) => (
                <Chip
                    label={tag.name}
                    onDelete={() => handleUnSelectTag(tag)}
                    className={classes.chip}
                    style={{backgroundColor: tag.color}}
                ></Chip>
            ))}
            {
                !isSelectShow?(<Chip
                    label="+"
                    className={classes.chip}
                    onClick={() => setIsSelectShow(true)}
                ></Chip>) : undefined
            }
            {
                isSelectShow?
                    (
                    <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        //value={tagState.selectedTags}
                        open={isSelectShow}
                        onChange={handleSelectTag}
                        input={<Input id="select-multiple-chip" />}
                    >
                        {
                            tagState.tags.map((tag) => (
                                <MenuItem key={tag.id} value={tag.id} style={{backgroundColor: tag.color}}>
                                {tag.name}
                                </MenuItem>
                            ))
                        }
                    </Select>

                    ) : undefined
            }
        </div>
    )
}

export default TagSelector