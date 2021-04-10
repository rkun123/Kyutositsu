import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit'
import { AppThunk, APIError } from './index'
import api from '../utils/api'
import { User } from './user'
import { selectTagById, Tag } from './tag'
import { setPostTagIds } from './settings/thunkActions'
import { notify } from './ui'


export type Post = {
    id: number,
    tags: Tag[],
    content: string,
    raw_content: string,
    column_size: number,
    color: string
    user_id: number,
    user: User,
    favorite_users: User[],
    created_at: Date,
    update_at: Date,
    assets: Asset[]
}

export type AssetUpload = {
    isUploading: boolean,
    asset: Asset
}

export type Asset = {
    id: number,
    file_type: string,
    file?: {
        url: string,
        thumbnail: {
            url: string
        }
    },
    url?: string
}

export type EditingPost = {
    content: string,
    tag_ids: number[],
    assetUploading: boolean,
    assets: Asset[]
}

const initialEditingPost = {
    content: '',
    tag_ids: [],
    assetUploading: false,
    assets: []
} as EditingPost

export type PostState = {
    posts: Array<Post>,
    detailPost?: Post,
    edit: EditingPost,
    isFetching: boolean,
    success: boolean,
    error: APIError | null
}

const initialState = {
    posts: [],
    detailPost: undefined,
    edit: initialEditingPost,
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
            // Check duplicated post before splice
            if(state.posts.find((post: Post) => (post.id === action.payload.id))) return
            state.posts.splice(0, 0, action.payload)
        },
        pushPostsToBottom(state, action: PayloadAction<Post[]>) {
            state.posts = state.posts.concat(action.payload)
        },
        deletePostById(state, action: PayloadAction<number>) {
            const idx = state.posts.findIndex((post) => (post.id === action.payload))
            if(idx > -1) state.posts.splice(idx, 1)
        },
        updatePost(state, action: PayloadAction<Post>) {
            const idx = state.posts.findIndex((post) => (post.id === action.payload.id))
            if(idx > -1) state.posts.splice(idx, 1, action.payload)
        },
        favoritePost(state, action: PayloadAction<{user: User, post: Post}>) {
            const idx = state.posts.findIndex((post) => (post.id === action.payload.post.id))
            if(idx === -1) return
            state.posts[idx].favorite_users.push(action.payload.user)
        },
        unFavoritePost(state, action: PayloadAction<{user: User, post: Post}>) {
            const postIdx = state.posts.findIndex((post) => (post.id === action.payload.post.id))
            if(postIdx === -1) return
            const favoriteIdx = state.posts[postIdx].favorite_users.findIndex((user) => user.id === action.payload.user.id)
            if(favoriteIdx > -1) state.posts[postIdx].favorite_users.splice(favoriteIdx, 1)
        },
        initEditingPost(state, action: Action) {
            state.edit = initialEditingPost
        },
        setEditingPost(state, action: PayloadAction<EditingPost>) {
            state.edit = action.payload
        },
        setEditingPostContent(state, action: PayloadAction<string>) {
            state.edit.content = action.payload
        },
        setEditingPostTagIds(state, action: PayloadAction<number[]>) {
            state.edit.tag_ids = action.payload
        },
        setDetailPost(state, action: PayloadAction<Post | undefined>) {
            state.detailPost = action.payload
        },
        appendAssetToEditingPost(state, action: PayloadAction<Asset>) {
            state.edit.assets.push(action.payload)
        },
        deleteAsset(state, action: PayloadAction<number>) {
            state.edit.assets.splice(action.payload, 1)
        },
        setUploadState(state, action: PayloadAction<boolean>) {
            state.edit.assetUploading = action.payload
        },
        clearPosts(state, action: Action) {
            state.posts = []
        },
        setError(state, action: PayloadAction<APIError | null>) {
            state.error = action.payload
        }
    }
})


export const {
    setPostFetching,
    setPostFetchingSuccessed,
    pushPostToTop,
    pushPostsToBottom,
    deletePostById,
    updatePost,
    favoritePost,
    unFavoritePost,
    initEditingPost,
    setEditingPost,
    setEditingPostContent,
    setEditingPostTagIds,
    setDetailPost,
    appendAssetToEditingPost,
    deleteAsset,
    setUploadState,
    clearPosts,
    setError
} = postSlice.actions


export const fetchPosts = (addition: boolean): AppThunk => async (dispatch, getState) => {
    // filtered selectedTags
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

    const res = await api.get('/posts?' + queries.join('&'), {})
    dispatch(setPostFetching(false))
    if(res.status === 200) {
        const posts = res.data as Array<Post>

        // if not addition fetch, clear all posts
        if(!addition) dispatch(clearPosts())

        dispatch(pushPostsToBottom(posts))

        dispatch(setPostFetchingSuccessed(true))
    } else {
        dispatch(setPostFetchingSuccessed(false))
    }
}

export const fetchPost = (id: number): AppThunk => async (dispatch, getState) => {
    const res = await api.get(`/posts/${id}`)
    if(res.status === 200) {
        dispatch(setPostFetching(true))
        const post = res.data as Post
        dispatch(setDetailPost(post))
    }
}

export const postPost = (editingPost: EditingPost): AppThunk => async (dispatch, getState) => {
    editingPost.tag_ids.forEach((tag_id) => {
        dispatch(selectTagById(tag_id, false))
    })

    const post = {
        content: editingPost.content,
        tag_ids: editingPost.tag_ids,
        asset_ids: editingPost.assets.map((asset) => (asset.id))
    }

    const res = await api.post('/posts', post, {})
    if(res.status === 201) {
        const post = res.data as Post
        dispatch(setError(null))
        dispatch(pushPostToTop(post))
        dispatch(setPostTagIds(editingPost.tag_ids))
    } else {
        const error = res.data as APIError
        dispatch(setError(error))
    }
}

export const postDeletePost = (id: number): AppThunk => async (dispatch, getState) => {
    await api.delete('/posts/' + id)
}

export const postFavorite = (post: Post): AppThunk => async (dispatch, getState) => {
    const user = getState().user.user
    const res = await api.post(`/posts/${post.id}/favorite`)
    if(res.status === 200) {
        dispatch(favoritePost({ user, post }))
    }
}

export const postUnFavorite = (post: Post): AppThunk => async (dispatch, getState) => {
    const user = getState().user.user
    const res = await api.delete(`/posts/${post.id}/favorite`)
    if(res.status === 200) {
        dispatch(unFavoritePost({ user, post }))
    }
}

export const postAsset = (file: File): AppThunk => async (dispatch, getState) => {
    // Validations
    if( file.size > 5 * 1000 * 1000 ) {
        // Asset's file size 5MB limit
        dispatch(notify({
            message: 'Asset File size exceeded.',
            severity: 'error',
            duration: 5000
        }))
        return
    }

    const params = new FormData()
    params.append('file', file)
    dispatch(setUploadState(true))
    const res = await api.post(
        'assets',
        params,
        { headers: { 'content-type': 'multipart/form-data' } }
    )
    dispatch(setUploadState(false))
    if( res.status === 201) {
        const asset = res.data as Asset
        dispatch(appendAssetToEditingPost(asset))
    }
}

// debug: api呼び出し未実装　without posting to api
export const postSketchfabAsset = (url: string): AppThunk => async (dispatch, getState) => {
    const asset = {
        id: 0,
        file_type: "sketchfab",
        file: {
            url: '',
            thumbnail: {
                url: ''
            }
        },
        url: url
    } as Asset
    dispatch(appendAssetToEditingPost(asset))
}

export default postSlice