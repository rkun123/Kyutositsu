import React from 'react'
import { makeStyles, createStyles, Box } from "@material-ui/core"
import { Asset } from '../../store/post'

type Props = {
    asset: Asset,
    index: number,
    open: (index: number) => void,
}

const useStyles = makeStyles((theme) => createStyles({
    thumbnail: {
        width: 150,
        borderRadius: '10px',
        cursor: 'pointer'
    },
    tile: {
        marginRight: '.5rem',
        '&:last-child': {
            marginRight: '0px'
        }
    }
}))

function AssetPreview({ asset, index, open }: Props) {
    const classes = useStyles()
    return (
        <React.Fragment>
            <Box className={classes.tile} gridColumn={2} onClick={() => {open(index)}}>
                <img className={classes.thumbnail} src={asset.file.thumbnail.url} alt={asset.file.url}></img>
            </Box>
        </React.Fragment>
    )
}

export default AssetPreview