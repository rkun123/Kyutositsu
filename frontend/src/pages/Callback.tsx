import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { actions as authActions, Auth} from '../store/auth'
import { actions as userActions, User } from '../store/user'
import apiClientGenerator from '../utils/apiClientGenerator'

function Callback() {
    const auth = useSelector((state: RootState) => state.auth)
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    async function fetchUserAndStore(auth: Auth) {
        const http = apiClientGenerator(auth)
        const res = await http.get('/auth/validate_token')
        console.log(res.data)
        if(res.data.success === true) {
            const user = res.data.data as User
            console.info('Success', user)
            dispatch(authActions.setAuth(auth))
            dispatch(userActions.setUser(user))
        }
    }

    useEffect(() => {
        async function f() {
            const param = new URLSearchParams(window.location.search)
            const auth = {
                authToken: param.get('auth_token')!,
                client: param.get('client_id')!,
                uid: param.get('uid')!
            }
            await fetchUserAndStore(auth)
        }
        f()
    }, [])

    return (
        <div>
            <h1>Callback</h1>
        </div>
    )
}

export default Callback