import { Drawer, List, IconButton } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { openDrawer, closeDrawer } from '../store/ui'
import PostEdit from './PostEdit'

type Props = {
    open: boolean
}

function AppDrawer(props: Props) {
    const isDrawerOpen = useSelector((state: RootState) => state.ui.isDrawerOpen)
    const dispatch = useDispatch()

    const handleDrawerClose = () => {
        if(isDrawerOpen)
            dispatch(closeDrawer())
    }

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
            }}
        >
            <List>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
                <PostEdit />
            </List>
        </Drawer>
    )
}

export default AppDrawer