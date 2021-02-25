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

    const isVideo = (url: string) => {
        const array = url.split('.')
        const ext = array[array.length - 1]
        if(ext.match(/(jpg|jpeg|gif|png)/)) return false
        else return true
    }

    const image = () => (
        <img src={asset.file.url} alt={asset.id.toString()} className={classes.source}></img>
    )
    const video = () => (
        <video src={asset.file.url} className={classes.source}></video>
    )

    const source = () => {
        if(isVideo(asset.file.url)) return video()
        else return image()
    }

    return (<Box className={classes.root}>
        { source() }
        <IconButton className={classes.deleteIcon} onClick={handleDeleteAsset}>
            <CloseIcon></CloseIcon>
        </IconButton>
    </Box>)
}

export default AssetPreview