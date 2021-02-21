import { makeStyles, Button, GridListTile } from '@material-ui/core'
import { fetchPosts } from '../store/post'
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    tile: {
        margin: 'none',
        width: '100%',
        backgroudColor: 'none'
    },
    card: {
        backgroudColor: 'none',
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center'
    },
    button: {
        margin: `${theme.spacing(1)}px 0`
    }
}))

function FetchNextPageButton() {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleFetchNext = () => {
        dispatch(fetchPosts(true))
    }

    return (
        <GridListTile className={classes.tile}>
            <div className={classes.card}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleFetchNext}
                >
                    Next
                </Button>
            </div>
        </GridListTile>
    )

}

export default FetchNextPageButton