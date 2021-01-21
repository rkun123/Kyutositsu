import React, { useState, useRef } from 'react'
import { ColorPicker } from 'material-ui-color'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/index'
import { postTag, Tag } from '../store/tag'
import { TextField, IconButton, Popover, List, makeStyles, ListItem, ListItemText } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'

const useStyles = makeStyles((theme) => ({
    colorPicker: {
        margin: 0
    },
    popOverGrid: {
        padding: theme.spacing(1)
    },
    nameField: {
        marginLeft: theme.spacing(1)
    }
}))

export default function TagEditor() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [popOverOpen, setPopOverOpen] = useState(false)
    const openButtonRef = useRef(null)
    const [tag, setTag] = useState<Tag>({
        name: '',
        color: ''
    } as Tag)

    const tagState = useSelector((state: RootState) => state.tag)

    const handlePopOverOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setPopOverOpen(true)
    }

    const handlePostTag = () => {
        dispatch(postTag(tag))
        setPopOverOpen(false)
    }

    const handleChangeColor = (e: any) => {
        setTag({
            ...tag,
            color: '#'+e.hex
        })
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.info(e.target.value)
        setTag({
            ...tag,
            name: e.target.value
        })
    }

    return (
        <React.Fragment>
            <IconButton onClick={handlePopOverOpen} ref={openButtonRef}>
                <AddIcon></AddIcon>
            </IconButton>

            <Popover open={ popOverOpen } onClose={() => (setPopOverOpen(false))} anchorEl={openButtonRef.current}>
                <List className={classes.popOverGrid}>
                    <ListItem>
                        <ListItemText primary="Color" />
                        <ColorPicker
                            defaultValue="red"
                            hideTextfield
                            value={tag.color}
                            disableAlpha={true}
                            onChange={handleChangeColor}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Name" />
                        <TextField
                            label="Tag name"
                            onChange={handleChangeName}
                            error={tagState?.error?.error ? true : false}
                            className={classes.nameField}
                        />
                    </ListItem>
                    <ListItem>
                        <IconButton onClick={handlePostTag}>
                            <CheckIcon></CheckIcon>
                        </IconButton>
                    </ListItem>
                </List>
            </Popover>
        </React.Fragment>
    )
}