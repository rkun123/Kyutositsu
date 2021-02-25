import { RootState } from '../../store';
import { Post, postFavorite, postUnFavorite } from '../../store/post';
import { createStyles, CardHeader, makeStyles, Typography, Avatar, Container, Chip, Box, IconButton } from '@material-ui/core'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import PostContextMenu from '../PostContextMenu'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx'
import AssetsPreview from './AssetsPreview'

type Props = {
    post: Post,
}

type StyleProps = {
    postColor: string,
}

const useStyles = makeStyles((theme) => (createStyles({
    root: {
        position: 'relative',
        margin: 'none',
        listStyle: 'none',
        maxWidth: '80%'
    },
    card: {
        position: 'relative',
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
    content: {
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
})))

function Detail({ post }: Props) {
    const classes = useStyles({
        postColor: post.color,
    })
    const dispatch = useDispatch()

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
        <Box className={classes.root}>
            <div className={clsx(classes.background, classes.colorBackground)}></div>
            <Box
                key={post.id}
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
                            <PostContextMenu post={post}></PostContextMenu>
                        </div>
                    }
                    subheader={ post.created_at }
                >
                </CardHeader>
                <Container className={classes.content}>
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
                    <Box display="flex" flexDirection="column" flexGrow="1" justifyContent="space-between">
                        <Box>
                            <Typography component="div" className={classes.content} dangerouslySetInnerHTML={{__html: post.raw_content}} />
                        </Box>
                        <AssetsPreview assets={post.assets}/>
                        <Box> { cardBottomToolBox() } </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    )

}

export default Detail