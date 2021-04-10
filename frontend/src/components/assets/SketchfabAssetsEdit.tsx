import { Button, TextField, Box, FormControl, makeStyles } from "@material-ui/core"
import React, { useState, ChangeEvent, useEffect } from "react"
import { useDispatch } from "react-redux"
import { postSketchfabAsset, Asset } from "../../store/post"

const useStyles = makeStyles((theme) => ({
    Button: {
        marginTop: theme.spacing(1.0)
    }
}))

const testString = new RegExp('https://sketchfab.com/3d-models/(.+-)*([A-z0-9]+)$')

function SketchfabAssetsEdit() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [ originUrl, setOriginUrl ] = useState<string>('')
    const [ urlEdit, setUrlEdit ] = useState<Asset>({
        id: 0,
        file_type: 'sketchfab',
        url: ''
    })
    const [ urlError, setUrlError] = useState<boolean>(true)
    const handleSketchfabAssetsButton = (): void => {
        dispatch(postSketchfabAsset(urlEdit.url!))
        setOriginUrl('')
    }
    const handlePostHotKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if(e.ctrlKey && e.key === 'Enter')
        handleSketchfabAssetsButton()
    }
    const setPostSketchfabAssets = (e: ChangeEvent<HTMLInputElement>) => {
        setOriginUrl(e.target.value)
        console.log(e.target.value)
    }
    useEffect(() => {
        const result = testString.test(originUrl)
        console.log(result)
        if(result) {
            setUrlError(false)
            const modelsId = originUrl.match(testString)
            setUrlEdit({
                id: 0,
                file_type: 'sketchfab',
                url: "https://sketchfab.com/models/"+modelsId![2]+"/embed"
            })
            console.log(setUrlEdit)
        }
        else setUrlError(true)
    }, [originUrl])

    return (
        <React.Fragment>
            <FormControl>
                <TextField
                    fullWidth
                    label='Sketchfab URL'
                    value={originUrl}
                    onChange={setPostSketchfabAssets}
                    onKeyDown={handlePostHotKey}
                />
            </FormControl>
            <Box className={classes.Button}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {handleSketchfabAssetsButton()}}
                    disabled={urlError ? true : false}
                >
                    追加
                </Button>
            </Box>
        </React.Fragment>
    )
}

export default SketchfabAssetsEdit