import { IconButton, makeStyles, Box } from "@material-ui/core"
import React from "react"
import { useDispatch } from "react-redux"
import CloseIcon from "@material-ui/icons/CloseRounded"
import { deleteAsset } from "../../store/post"
import { Asset } from '../../store/post'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        width: '100%',
        top: '10px'
    },
    source: {
        width: '100%'
    },
    deleteIcon: {
        position: 'absolute',
        top: '5px',
        right: '5px'
    }
}))

type Props = {
    asset: Asset,
    idx: number
}


function AssetPreview({ asset, idx }: Props) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleDeleteAsset = () => {
        dispatch(deleteAsset(idx))
    }

    const image = () => (
        <img src={asset.file.url} alt={asset.id.toString()} className={classes.source}></img>
    )
    const video = () => (
        <video src={asset.file.url} className={classes.source}></video>
    )

    const source = () => {
        if(asset.file_type === 'IMAGE') return image()
        else if(asset.file_type === 'VIDEO') return video()
    }

    return (<Box className={classes.root}>
        { source() }
        <IconButton className={classes.deleteIcon} onClick={handleDeleteAsset}>
            <CloseIcon></CloseIcon>
        </IconButton>
    </Box>)
}

export default AssetPreview