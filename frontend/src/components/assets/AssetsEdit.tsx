import { Button, makeStyles } from "@material-ui/core"
import React, { useCallback } from "react"
import { createRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import AddIcon from "@material-ui/icons/Add"
import { postAsset } from "../../store/post"

const useStyles = makeStyles((theme) => ({
    defaultFileButton: {
        display: 'none'
    }
}))


function AssetsEdit() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const inputEl = createRef<HTMLInputElement>()
    const uploading = useSelector((state: RootState) => (state.post.assetUploading))

    const handleFilesChanged = useCallback(() => {
        const files = inputEl.current?.files
        if(files === null || files === undefined) return
        if(files.length <= 0) return

        for(let i=0; i<files.length; i++) {
            const file = files.item(i)
            if(file === null) break;
            dispatch(postAsset(file))
        }

    }, [dispatch, inputEl])

    const handleOpenFileDialog = () => {
        inputEl.current!.click()
    }

    useEffect(() => {
        const elem = inputEl.current!
        elem.addEventListener('change', handleFilesChanged)
        return () => {
            elem.removeEventListener('change', handleFilesChanged)
        }
    }, [inputEl, handleFilesChanged])

    return (
        <React.Fragment>
            <form>
                <input type="file" className={classes.defaultFileButton} accept=".jpg,.jpeg,.gif,.png" ref={inputEl} multiple></input>
                <Button
                onClick={handleOpenFileDialog}
                disabled={uploading}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}>
                    Asset
                </Button>
                </form>
        </React.Fragment>
    )
}

export default AssetsEdit