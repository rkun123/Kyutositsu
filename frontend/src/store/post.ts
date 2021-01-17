import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, APIError } from './index'
import api from '../utils/api'
import { User } from './user'


export type Post = {
    id: number,
    content: string,
    color: string
    user_id: number,
    user: User,
    created_at: Date,
    update_at: Date,
}

export type EditingPost = {
    content: string,
}

export type PostState = {
    posts: Array<Post>,
    isFetching: boolean,
    success: boolean,
    error: APIError | null
}

const initialState = {
    posts: [],
    isFetching: false,
    success: false,
    error: null
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
        },
        setError(state, action: PayloadAction<APIError>) {
            state.error = action.payload
        }
    }
})


export const { setPost, pushPostToTop, setError } = postSlice.actions


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

export const postPost = (editingPost: EditingPost): AppThunk => async (dispatch, getState) => {
    const { auth } = getState()
    const res = await api.post('/posts', editingPost, {
        headers: {
            'access-token': auth.authToken,
            'token-type': 'Bearer',
            'client': auth.client,
            'uid': auth.uid
        }
    })
    if(res.status === 201) {
        const post = res.data as Post
        dispatch(pushPostToTop(post))
    } else {
        const error = res.data as APIError
        setError(error)
    }
    
}

export default postSlice