import axios from 'axios'

export const backendURL = process.env.REACT_APP_URL || 'http://localhost:3000'

const api = axios.create({
    baseURL: `${backendURL}/api/v1`,
    withCredentials: true
})

export default api

export const errorToString = (error: any) => {
    let errorStr = ''
    for(const [key, value] of Object.entries(error)) {
        errorStr += `${key}: ${value}`
    }
    return errorStr
}