import { useState } from 'react'
import { Modal, Fade, Backdrop } from '@material-ui/core'
import { Asset } from '../../store/post'

type AssetProp = {
    asset: Asset
}

function AssetModal({ asset }: AssetProp) {
    const [open, setOpen] = useState(false)
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <img src={asset.file.url}></img>
            </Fade>
        </Modal>
    )
}

export default AssetModal