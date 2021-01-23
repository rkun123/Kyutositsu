import { AppThunk } from '../index'
import api from '../../utils/api'
import { Settings, setSetting, _setSelectedTagIds, _setPostTagIds } from './index'
import { setSelectedTagsById } from '../tag'


export const fetchSetting = (): AppThunk => async (dispatch, getState) => {
    const { auth } = getState()
    const res = await api.get('/user_settings', {
        headers: {
            'access-token': auth.authToken,
            'token-type': 'Bearer',
            'client': auth.client,
            'uid': auth.uid
        }
    })

    if(res.status === 200) {
        const setting = res.data.setting as Settings
        dispatch(setSetting(setting))
        dispatch(setSelectedTagsById(setting.selectedTagIds))
    }
}

export const setSelectedTagIds = (selectedTagIds: number[]): AppThunk => async (dispatch, getState) => {
    dispatch(_setSelectedTagIds(selectedTagIds))
    dispatch(postSetting())
}

export const setPostTagIds = (selectedTagIds: number[]): AppThunk => async (dispatch, getState) => {
    dispatch(_setPostTagIds(selectedTagIds))
    dispatch(postSetting())
}

export const postSetting = (): AppThunk => async (dispatch, getState) => {
    const { auth, settings } = getState()
    const res = await api.put('/user_settings', { setting: settings }, {
        headers: {
            'access-token': auth.authToken,
            'token-type': 'Bearer',
            'client': auth.client,
            'uid': auth.uid
        }
    })
}