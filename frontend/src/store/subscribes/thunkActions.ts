import { AppThunk } from '../index'
import { Tag } from '../tag'
import createConsumer from '../../utils/actionCableConsumer.js'
import { addChannel, clearChannels } from './index'
import { Post, pushPostToTop} from '../post'

export const updateChannels = (): AppThunk => async (dispatch, getState) => {
    dispatch(closeAndClearAllChannels())
    const state = getState()
    const consumer = createConsumer(state.auth.uid, state.auth.client, state.auth.authToken)

    const tag_ids = state.tag.selectedTags.map((tag: Tag) => (tag.id))
    tag_ids.forEach((tag_id) => {
        const channel = consumer.subscriptions.create({
            channel: 'PostChannel',
            tag_id
        }, {
            received(data: any) {
                const post = JSON.parse(data) as Post
                dispatch(pushPostToTop(post))
            },
        })

        dispatch(addChannel(channel))
    })
}

export const closeAndClearAllChannels = (): AppThunk => async(dispatch, getState) => {
    const channels = getState().subscribes.channels as Array<any>
    if(channels === undefined) return
    channels.forEach((channel) => {
        channel.unsubscribe()
    })
    dispatch(clearChannels())
}