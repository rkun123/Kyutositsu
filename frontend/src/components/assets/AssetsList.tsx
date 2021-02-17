import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/index'
import { Asset } from '../../store/post'
import AssetPreview from './AssetPreview'

function AssetsList() {
    const assets = useSelector((state: RootState) => (state.post.edit.assets))

    return (
        <Box display="flex" flexDirection="column">
            {
                assets.map((asset: Asset, idx: number) => (
                    <AssetPreview asset={asset} idx={idx}></AssetPreview>
                ))
            }
        </Box>
    )
}

export default AssetsList