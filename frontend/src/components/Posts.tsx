import React, { useEffect, useState, useRef } from 'react'
import { GridList, makeStyles } from '@material-ui/core'
import { useSelector } from "react-redux"
import { RootState } from '../store'
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

    const [columnWidth, setColumnWidth] = useState(300)
    const gridListRef = useRef(null)

    const postState = useSelector((state: RootState) => {
        return state.post
    })

    const posts = postState.posts.map(post => {
        return (
            <PostCard post={post} columnWidth={columnWidth} key={post.id}></PostCard>
        )
    })

    useEffect(() => {
        if(!gridListRef.current) return
        const gridList = gridListRef.current! as HTMLUListElement
        console.info(gridList)
        const calcColumnWidth = () => {
            const width = gridList.offsetWidth
            const numberOfColumns = Math.floor(width / 300)
            const w = 300 + width % 300 / numberOfColumns
            console.log('width', width)
            setColumnWidth(w)
        }

        window.addEventListener('resize', calcColumnWidth)
        calcColumnWidth()
        //const observer = new MutationObserver(calcCardWidth)

        //observer.observe(gridList, {attributes: true, attributeFilter: ['style']})
    }, [])

    return (
        <GridList className={classes.root} style={{margin: 0}} ref={gridListRef}>
            {posts}
            <FetchNextPageButton />
        </GridList>
    )
}

export default Posts