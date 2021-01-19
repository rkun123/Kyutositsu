import React, { useEffect, useState, useRef } from 'react'
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

    const [postCardWidth, setPostCardWidth] = useState(300)
    const gridListRef = useRef(null)

    const postState = useSelector((state: RootState) => {
        return state.post
    })

    const posts = postState.posts.map(post => {
        return (
            <PostCard post={post} cardWidth={postCardWidth} key={post.id}></PostCard>
        )
    })

    useEffect(() => {
        if(!gridListRef.current) return
        const gridList = gridListRef.current! as HTMLUListElement
        console.info(gridList)
        const calcCardWidth = () => {
            const width = gridList.offsetWidth
            const numberOfColumns = Math.floor(width / 300)
            const w = 300 + width % 300 / numberOfColumns
            console.log('width', width)
            setPostCardWidth(w)
        }

        window.addEventListener('resize', calcCardWidth)
        //const observer = new MutationObserver(calcCardWidth)

        //observer.observe(gridList, {attributes: true, attributeFilter: ['style']})
    }, [gridListRef.current])

    return (
        <GridList className={classes.root} style={{margin: 0}} ref={gridListRef}>
            {posts}
            <FetchNextPageButton />
        </GridList>
    )
}

export default Posts