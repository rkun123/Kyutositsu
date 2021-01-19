import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, APIError } from './index'
import api from '../utils/api'
import { User } from './user'


export type Tag = {
    id: number,
    name: string
    color: string
    created_by: User,
    created_at: Date,
    update_at: Date,
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
        selectTag(state, action: PayloadAction<Tag>) {
            if(!state.selectedTags.find(tag => (tag.id === action.payload.id))) {
                state.selectedTags.push(action.payload)
            }
        },
        unSelectTag(state, action: PayloadAction<Tag>) {
            const index = state.selectedTags.findIndex((tag: Tag) => (tag.id === action.payload.id))
            if(index > -1) state.selectedTags.splice(index, 1)
        },
        setError(state, action: PayloadAction<APIError>) {
            state.error = action.payload
        }
    }
})


export const { setTagState, pushTag, selectTag, unSelectTag, setError } = tagSlice.actions


export const fetchTags = (): AppThunk => async (dispatch, getState) => {
    const { auth, tag } = getState()
    const res = await api.get('/tags', {
        headers: {
            'access-token': auth.authToken,
            'token-type': 'Bearer',
            'client': auth.client,
            'uid': auth.uid
        }
    })
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

export const postTag = (tag: Tag): AppThunk => async (dispatch, getState) => {
    const { auth } = getState()
    const res = await api.post('/tags', tag, {
        headers: {
            'access-token': auth.authToken,
            'token-type': 'Bearer',
            'client': auth.client,
            'uid': auth.uid
        }
    })
    if(res.status === 201) {
        const tag = res.data as Tag
        dispatch(pushTag(tag))
    } else {
        const error = res.data as APIError
        setError(error)
    }
    
}

export default tagSlice