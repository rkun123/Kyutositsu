import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { Auth, initAuth } from '../store/auth'

function Callback() {
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(() => {
        const param = new URLSearchParams(window.location.search)
        const auth = {
            authToken: param.get('auth_token')!,
            client: param.get('client_id')!,
            uid: param.get('uid')!
        } as Auth
        dispatch(initAuth(auth))
        window.localStorage.setItem('sns_auth', JSON.stringify(auth))
        history.push('/')
        
    }, [dispatch, history])

    return (
        <div>
            <h1>Callback</h1>
        </div>
    )
}

export default Callback