import store from '../store/index'
import axios from 'axios'

const apiClientGenerator = (auth: any) => {
    return axios.create({
        baseURL: 'http://localhost:3000/api/v1',
        headers: {
            'access-token': auth.authToken,
            'token-type': 'Bearer',
            'client': auth.client,
            'uid': auth.uid
        }
    })
}

export default apiClientGenerator