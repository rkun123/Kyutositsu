import { useState, useMemo } from 'react'
import { Box } from "@material-ui/core"
import { Asset } from '../../store/post'
import AssetPreview from './AssetPreview'
import ImageViewer from 'react-simple-image-viewer'

type Props = {
    assets: Asset[]
}

function AssetPreviews({ assets }: Props) {

    const [ viewIndex, setViewIndex ] = useState<number | null>(null)

    const assetsSourceList = useMemo(() => (assets.map((asset) => (asset.file.url))), [assets])

    const showAssetDetail = (index: number) => {
        setViewIndex(index)
    }
    const closeAssetDetail = () => {
        setViewIndex(null)
    }
    return (
        <Box display="flex" flexDirection="row" gridColumn>
            {
                assets.map((asset, index) => (
                    <AssetPreview asset={asset} index={index} open={showAssetDetail} />
                ))
            }
            {
                viewIndex !== null
                ? <ImageViewer src={assetsSourceList} currentIndex={viewIndex} onClose={() => {closeAssetDetail()}} />
                : null
            }
        </Box>
    )
}

export default AssetPreviews