import axios from 'axios'

export const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:2000'

const api = axios.create({
    baseURL: `${backendURL}/api/v1`,
})

export default api

export const errorToString = (error: any) => {
    let errorStr = ''
    for(const [key, value] of Object.entries(error)) {
        errorStr += `${key}: ${value}`
    }
    return errorStr
}