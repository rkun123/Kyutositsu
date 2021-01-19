import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit'
import { AppThunk, APIError } from './index'
import api from '../utils/api'
import { User } from './user'
import { Tag } from './tag'


export type Post = {
    id: number,
    tags: Tag[],
    content: string,
    color: string
    user_id: number,
    user: User,
    created_at: Date,
    update_at: Date,
}

export type EditingPost = {
    content: string,
    tag_ids: number[]
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
        setPostFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload
        },
        setPostFetchingSuccessed(state, action: PayloadAction<boolean>) {
            state.success = action.payload
        },
        pushPostToTop(state, action: PayloadAction<Post>) {
            state.posts.splice(0, 0, action.payload)
        },
        pushPostsToBottom(state, action: PayloadAction<Post[]>) {
            state.posts = state.posts.concat(action.payload)
        },
        clearPosts(state, action: Action) {
            state.posts = []
        },
        setError(state, action: PayloadAction<APIError>) {
            state.error = action.payload
        }
    }
})


export const { setPostFetching, setPostFetchingSuccessed, pushPostToTop, pushPostsToBottom, clearPosts, setError } = postSlice.actions


export const fetchPost = (addition: boolean): AppThunk => async (dispatch, getState) => {
    // filtered selectedTags
    const { auth } = getState()

    const offset = getState().post.posts.length

    dispatch(setPostFetching(true))
    dispatch(setPostFetchingSuccessed(false))

    const selectedTags = getState().tag.selectedTags

    let queries = [] as string[]

    if(selectedTags.length > 0) {
        const ids = selectedTags.map((tag) => (`tag[]=${tag.id}`))
        queries = queries.concat(ids)
    }

    if(addition) queries.push(`offset=${offset}`)

    const res = await api.get('/posts?' + queries.join('&'), {
        headers: {
            'access-token': auth.authToken,
            'token-type': 'Bearer',
            'client': auth.client,
            'uid': auth.uid
        }
    })
    dispatch(setPostFetching(false))
    if(res.status === 200) {
        const posts = res.data as Array<Post>
        dispatch(pushPostsToBottom(posts))

        dispatch(setPostFetchingSuccessed(true))
    } else {
        dispatch(setPostFetchingSuccessed(false))
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