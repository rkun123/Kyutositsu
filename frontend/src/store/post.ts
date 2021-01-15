import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from './index'
import api from '../utils/api'


export type Post = {
    id: number,
    title: string,
    content: string,
    user_id: number,
    created_at: Date,
    update_at: Date
}

export type PostState = {
    posts: Array<Post>,
    isFetching: boolean,
    success: boolean
}

const initialState = {
    posts: [],
    isFetching: false,
    success: false
} as PostState

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPost(state, action: PayloadAction<PostState>) {
            return action.payload
        },
        pushPostToTop(state, action: PayloadAction<Post>) {
            state.posts.splice(0, 0, action.payload)
        }
    }
})


export const { setPost, pushPostToTop } = postSlice.actions


export const fetchPost = (): AppThunk => async (dispatch, getState) => {
    const { auth } = getState()
    const res = await api.get('/posts', {
        headers: {
            'access-token': auth.authToken,
            'token-type': 'Bearer',
            'client': auth.client,
            'uid': auth.uid
        }
    })
    if(res.status === 200) {
        const posts = res.data as Array<Post>
        console.info('Success', posts)
        dispatch(setPost({
            isFetching: false,
            success: true,
            posts
        } as PostState))
    }
}

export default postSlice