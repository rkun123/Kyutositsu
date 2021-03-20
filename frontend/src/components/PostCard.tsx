import { RootState } from '../store';
import { Post, postFavorite, postUnFavorite } from '../store/post';
import { Paper, CardHeader, makeStyles, Typography, Avatar, GridListTile, Container, Chip, Box, IconButton } from '@material-ui/core'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import PostContextMenu from './PostContextMenu'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'

type Props = {
    post: Post,
    columnWidth: number,
    isSingleColumn: boolean,
    isNotification: boolean
}

type StyleProps = {
    postColor: string,
    cardWidth: number,
    cardHeight: number,
    isSingleColumn: boolean,
    thumbnail: string | undefined
}

const useStyles = makeStyles((theme) => ({
    tile: {
        margin: 'none',
        width: (props: StyleProps) => (props.isSingleColumn ? `${props.cardHeight}px` : `${props.cardWidth}px`),
        minHeight: (props: StyleProps) => (`${props.cardHeight}px`),
        height: '0px'
    },
    card: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: 'none',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    colorBackground: {
        backgroundColor: (props: StyleProps) => (props.postColor),
    },
    imageBackground: {
        backgroundImage: (props: StyleProps) => (`url("${props.thumbnail}")`),
        backgroundSize: 'contain',
        opacity: 0.2,
        filter: 'blur(2px)'
    },
    title: {
        fontWeight: "bold"
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between'
    },
    chip: {
        marginRight: theme.spacing(1)
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
    textContainer: {
        position: 'relative',
        overflow: 'hidden'
    },
    text: {
        position: 'absolute',
        overflowWrap: 'anywhere',
    },
    tags: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
        flexWrap: 'wrap'
    },
    cardBottomToolBox: {
    }
}))

function PostCard({post, columnWidth, isSingleColumn, isNotification = false}: Props) {
    const classes = useStyles({
        postColor: post.color,
        cardWidth: columnWidth * post.column_size,
        cardHeight: columnWidth,
        thumbnail: post.assets.length > 0 ? post.assets[0].file.thumbnail.url : undefined,
        isSingleColumn
    })
    const dispatch = useDispatch()
    const history = useHistory()

    const [favoritedByMe, setFavoritedByMe] = useState(false)

    const user = useSelector((state: RootState) => state.user.user)

    useEffect(() => {
        setFavoritedByMe(
            post.favorite_users.find(favorite_user => favorite_user.id === user.id) !== undefined
        )
    }, [setFavoritedByMe, post, user])

    const handleFavorite = () => {
        if(!favoritedByMe) dispatch(postFavorite(post))
        else dispatch(postUnFavorite(post))
    }

    const handleShowDetail = () => {
        history.push(`/posts/${post.id}`)
    }

    const cardBottomToolBox = () => (
        <Box display="flex" flexDirection="row" alignItems="center" className={classes.cardBottomToolBox}>
            <IconButton onClick={handleFavorite}>
            { favoritedByMe
                ? <Favorite />
                : <FavoriteBorder /> }
            </IconButton>
            <Typography>
                { post.favorite_users.length }
            </Typography>
        </Box>
    )

    return (
        <GridListTile
            className={classes.tile}
        >
            <div className={clsx(classes.background, classes.colorBackground)}></div>
            <div className={clsx(classes.background, classes.imageBackground)}></div>
                <Paper
                    key={post.id}
                    square
                    className={classes.card}
                >
                    <CardHeader
                        avatar={
                            <Avatar
                                src={ post.user.image }
                            >{ post.user.nickname }</Avatar>
                        }
                        title={
                            <div className={classes.titleContainer}>
                                <Typography variant="h6">{ post.user.nickname }</Typography>
                                { isNotification ? null : <PostContextMenu post={post}></PostContextMenu> }
                            </div>
                        }
                        subheader={ post.created_at }
                    >
                    </CardHeader>
                    <Container className={classes.contentContainer}>
                        <div className={classes.tags}>
                            {post.tags.map((tag) => (
                                <Chip
                                    label={tag.name}
                                    className={classes.chip}
                                    size="small"
                                    variant="outlined"
                                    style={{backgroundColor: tag.color}}
                                ></Chip>
                            ))}
                        </div>
                        <Box display="flex" flexDirection="column" flexGrow="2" justifyContent="space-between">
                            <Box flexGrow={2} className={classes.textContainer} onClick={handleShowDetail}>
                                <Typography component="div" className={classes.text} dangerouslySetInnerHTML={{__html: post.raw_content}} />
                            </Box>
                            { isNotification ? null : <Box> { cardBottomToolBox() } </Box> }
                        </Box>
                    </Container>
                </Paper>
        </GridListTile>
    )

}

export default PostCard