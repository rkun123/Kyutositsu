import { useEffect } from "react"
import store from '../store/index'
import { actions as authActions, Auth} from '../store/auth'
import { actions as userActions, User } from '../store/user'
import apiClientGenerator from '../utils/apiClientGenerator'

function Callback() {
    async function fetchUserAndStore() {
        const http = apiClientGenerator(store.getState().auth)
        const res = await http.get('/auth/validate_token')
        console.log(res.data)
        if(res.data.success === true) {
            const user = res.data.data as User
            console.warn(user)
            store.dispatch(userActions.setUser(user))
        }

        console.info(store.getState().user)
    }

    useEffect(() => {
        async function f() {
            const param = new URLSearchParams(window.location.search)
            store.dispatch(authActions.setAuth({
                authToken: param.get('auth_token')!,
                client: param.get('client_id')!,
                uid: param.get('uid')!
            }))
            console.info(store.getState())
            await fetchUserAndStore()
        }
        f()
    })

    return (
        <div>
            <h1>Callback</h1>
        </div>
    )
}

export default Callback