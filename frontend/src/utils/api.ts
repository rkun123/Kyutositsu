import axios from 'axios'

const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:2000'

const api = axios.create({
    baseURL: `${backendURL}/api/v1`,
})

export default api