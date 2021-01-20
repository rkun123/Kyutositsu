import { Drawer, List, IconButton, makeStyles, Container } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { closeDrawer } from '../store/ui'
import PostEdit from './PostEdit'

type Props = {
    open: boolean
}

type StyleProps = {
    drawerWidth: number
}

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: (props: StyleProps) => (`${props.drawerWidth}px`)
    }
}))

function AppDrawer(props: Props) {
    const isDrawerOpen = useSelector((state: RootState) => state.ui.isDrawerOpen)
    const dispatch = useDispatch()
    const drawerWidth = useSelector((state: RootState) => state.ui.drawerWidth)

    const classes = useStyles({ drawerWidth })

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
                paper: classes.drawer
            }}
        >
            <Container>
                <List>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <PostEdit />
                </List>

            </Container>
        </Drawer>
    )
}

export default AppDrawer