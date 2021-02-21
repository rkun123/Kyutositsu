import { makeStyles, createStyles, GridList, GridListTile } from "@material-ui/core"
import { Asset } from '../../store/post'

type Props = {
    assets: Asset[]
}

const useStyles = makeStyles((theme) => createStyles({
    thumbnail: {
        width: 300
    },
    tile: {
        width: '100%',
        height: '100%'
    }
}))

function AssetsPreview({ assets }: Props) {
    const classes = useStyles()

    return (
        <GridList cellHeight="auto" cols={assets.length <= 1 ? 1 : 2}>
            {
                assets.map((asset) => (
                    <GridListTile  className={classes.tile}>
                        <img className={classes.thumbnail} src={asset.file.thumbnail.url} alt={asset.file.url}></img>
                    </GridListTile>
                ))
            }
        </GridList>
    )
}

export default AssetsPreview