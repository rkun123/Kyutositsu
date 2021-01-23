import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, APIError } from './index'
import api, { errorToString } from '../utils/api'
import { User } from './user'
import { fetchPost } from './post'
import { subscribeChannel, unSubscribeChannel } from './subscribes/thunkActions'


export type Tag = {
    id: number,
    name: string,
    color: string,
    created_by: User,
    created_at: Date,
    update_at: Date
}

export type TagState = {
    tags: Array<Tag>,
    selectedTags: Array<Tag>,
    isFetching: boolean,
    success: boolean,
    error: APIError | null
}

const initialState = {
    tags: [],
    selectedTags: new Array<Tag>(),
    isFetching: false,
    success: false,
    error: null
} as TagState

const tagSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setFetchState(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload
        },
        setTagState(state, action: PayloadAction<TagState>) {
            return action.payload
        },
        pushTag(state, action: PayloadAction<Tag>) {
            state.tags.push(action.payload)
        },
        _selectTag(state, action: PayloadAction<Tag>) {
            if(!state.selectedTags.find(tag => (tag.id === action.payload.id))) {
                state.selectedTags.push(action.payload)
            }
        },
        _unSelectTag(state, action: PayloadAction<Tag>) {
            const index = state.selectedTags.findIndex((tag: Tag) => (tag.id === action.payload.id))
            if(index > -1) state.selectedTags.splice(index, 1)
        },
        setError(state, action: PayloadAction<APIError>) {
            state.error = action.payload
        }
    }
})


export const { setFetchState, setTagState, pushTag, _selectTag, _unSelectTag, setError } = tagSlice.actions


export const fetchTags = (): AppThunk => async (dispatch, getState) => {
    const { auth, tag } = getState()
    dispatch(setFetchState(true))
    const res = await api.get('/tags', {
        headers: {
            'access-token': auth.authToken,
            'token-type': 'Bearer',
            'client': auth.client,
            'uid': auth.uid
        }
    })
    dispatch(setFetchState(false))
    if(res.status === 200) {
        const tags = res.data as Array<Tag>
        console.info('Success', tags)
        dispatch(setTagState({
            ...tag,
            isFetching: false,
            success: true,
            tags
        } as TagState))
    }
}

export const selectTag = (tag: Tag, refreshPost: boolean = true): AppThunk => (dispatch, getState) => {
    dispatch(_selectTag(tag))
    dispatch(subscribeChannel(tag.id))
    if(refreshPost) dispatch(fetchPost(false))
}

export const selectTagById = (tag_id: number, refreshPost: boolean = true): AppThunk => (dispatch, getState) => {
    const { tags } = getState().tag
    const tag = tags.find((tag) => (tag.id === tag_id))

    if(tag === undefined) return
    dispatch(selectTag(tag, refreshPost))
}

export const unSelectTag = (tag: Tag, refreshPost: boolean = true): AppThunk => (dispatch, getState) => {
    dispatch(_unSelectTag(tag))
    dispatch(unSubscribeChannel(tag.id))
    if(refreshPost) dispatch(fetchPost(false))
}

export const postTag = (tag: Tag): AppThunk => async (dispatch, getState) => {
    const { auth } = getState()
    try {
        const res = await api.post('/tags', tag, {
            headers: {
                'access-token': auth.authToken,
                'token-type': 'Bearer',
                'client': auth.client,
                'uid': auth.uid
            }
        })
        if(res.status === 201) {
            dispatch(fetchTags())
        }

    } catch(e) {
        const errorStr = errorToString(e.response.data)
        const error = {
            error: errorStr
        } as APIError
        setError(error)
    }
    
}

export default tagSlice