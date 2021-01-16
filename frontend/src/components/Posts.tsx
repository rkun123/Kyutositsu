import React, { useEffect } from 'react'
import { Grid, GridList, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../store'
import { fetchPost } from '../store/post'
import PostCard from './PostCard'

function Posts() {

    const dispatch = useDispatch()
    const postState = useSelector((state: RootState) => {
        console.log('.')
        console.log(state.post)
        return state.post
    })

    const posts = postState.posts.map(post => {
        console.info(post)
        return (
            <PostCard post={post} key={post.id}></PostCard>
        )
    })

    return (
        <React.Fragment>
            <GridList
                cellHeight="auto"
                spacing={0}
                cols={6}
            >
                {posts}
            </GridList>
        </React.Fragment>
    )
}

export default Posts