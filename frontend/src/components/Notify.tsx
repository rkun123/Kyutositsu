import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/index'
import { closeNotify, Notify as NotifyType } from '../store/ui'

function Notify() {
    const dispatch = useDispatch()

    const notify = useSelector((state: RootState) => (state.ui.notify))

    const [cacheNotify, setCacheNotify] = useState<NotifyType>({
        severity: 'error',
        variant: undefined,
        message: '',
        duration: 0
    })

    useEffect(() => {
        if(notify !== undefined) setCacheNotify(notify)
    }, [notify, setCacheNotify])

    const handleClose = () => {
        dispatch(closeNotify())
    }

    return (
        <Snackbar
            open={notify !== undefined}
            autoHideDuration={notify?.duration}
            onClose={handleClose}
        >
            <Alert
            variant={notify?.variant || 'filled'}
            severity={notify?.severity! || cacheNotify.severity}>
                {notify?.message || cacheNotify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notify