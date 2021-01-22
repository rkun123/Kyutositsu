import { AppThunk } from '../index'
import createConsumer from '../../utils/actionCableConsumer.js'
import { addChannel, deleteChannel, ChannelEntry } from './index'
import { Post, pushPostToTop} from '../post'

export const subscribeChannel = (tag_id: number): AppThunk => (dispatch, getState) => {
    const { auth, subscribes } = getState()
    // Avoid create duplicated channel.
    if(subscribes.channels.find((channelEntry) => (channelEntry.tag_id === tag_id)) !== undefined) return

    const consumer = createConsumer(auth.uid, auth.client, auth.authToken)
    const channel = consumer.subscriptions.create({
        channel: 'PostChannel',
        tag_id
    }, {
        received(data: any) {
            const post = JSON.parse(data) as Post
            dispatch(pushPostToTop(post))
        },
    })

    const channelEntry = {
        channel,
        tag_id
    } as ChannelEntry

    dispatch(addChannel(channelEntry))
}

export const unSubscribeChannel = (tag_id: number): AppThunk => (dispatch, getState) => {
    const state = getState()
    const channel = state.subscribes.channels.find((channelEntry) => (channelEntry.tag_id === tag_id))
    if(channel === undefined) return
    channel.channel.unsubscribe()
    dispatch(deleteChannel(tag_id))
}

export const closeAndClearAllChannels = (): AppThunk => async(dispatch, getState) => {
    const state = getState()
    const channels = state.subscribes.channels
    const selectedTags = state.tag.selectedTags
    channels.forEach((channelEntry) => {
        if(selectedTags.find((tag) => (channelEntry.tag_id === tag.id))) return
        channelEntry.channel.unsubscribe()
    })
}