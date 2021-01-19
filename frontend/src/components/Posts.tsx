import React, { useEffect } from 'react'
import { Grid, GridList, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../store'
import { fetchPost } from '../store/post'
import PostCard from './PostCard'
import FetchNextPageButton from './FetchNextPageButton'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 0,
        width: '100%'
    }
}))

function Posts() {
    const classes = useStyles()

    const dispatch = useDispatch()
    const postState = useSelector((state: RootState) => {
        return state.post
    })

    const posts = postState.posts.map(post => {
        return (
            <PostCard post={post} key={post.id}></PostCard>
        )
    })

    return (
        <GridList className={classes.root} style={{margin: 0}}>
            {posts}
            <FetchNextPageButton />
        </GridList>
    )
}

export default Posts