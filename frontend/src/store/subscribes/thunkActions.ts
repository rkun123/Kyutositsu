import { AppThunk } from '../index'
import consumer from '../../utils/actionCableConsumer.js'
import { addChannel, deleteChannel, ChannelEntry } from './index'
import { Post, pushPostToTop, deletePostById, updatePost } from '../post'

export const subscribeChannel = (tag_id: number): AppThunk => (dispatch, getState) => {
    const { subscribes } = getState()
    // Avoid create duplicated channel.
    if(subscribes.channels.find((channelEntry) => (channelEntry.tag_id === tag_id)) !== undefined) return

    const channel = consumer.subscriptions.create({
        channel: 'PostChannel',
        tag_id
    }, {
        received(data: any) {
            switch(data.type) {
                case 'NEW': {
                    const post = JSON.parse(data.payload) as Post
                    dispatch(pushPostToTop(post))
                    break;
                }
                case 'DELETE': {
                    const id = parseInt(data.payload.id)
                    dispatch(deletePostById(id))
                    break;
                }
                case 'UPDATE': {
                    const post = JSON.parse(data.payload) as Post
                    dispatch(updatePost(post))
                    break;
                }
            }
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