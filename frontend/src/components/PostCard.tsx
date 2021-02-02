import { RootState } from '../store';
import { Post, postFavorite, postUnFavorite } from '../store/post';
import { Paper, CardHeader, makeStyles, Typography, Avatar, GridListTile, Container, Chip, Box, IconButton } from '@material-ui/core'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import PostContextMenu from './PostContextMenu'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

type Props = {
    post: Post,
    columnWidth: number,
    isSingleColumn: boolean
}

type StyleProps = {
    postColor: string,
    cardWidth: number,
    cardHeight: number,
    isSingleColumn: boolean
}

const useStyles = makeStyles((theme) => ({
    tile: {
        margin: 'none'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: (props: StyleProps) => (props.isSingleColumn ? `${props.cardHeight}px` : `${props.cardWidth}px`),
        minHeight: (props: StyleProps) => (`${props.cardHeight}px`),
        backgroundColor: (props: StyleProps) => (props.postColor)
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
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflowWrap: 'anywhere',
        marginBottom: theme.spacing(1)
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

function PostCard({post, columnWidth, isSingleColumn}: Props) {
    const classes = useStyles({
        postColor: post.color,
        cardWidth: columnWidth * post.column_size,
        cardHeight: columnWidth,
        isSingleColumn
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
        <GridListTile
            className={classes.tile}
        >
            <Paper
                key={post.id}
                square
                className={classes.card}
            >
                <CardHeader
                    avatar={
                        <Avatar
                            src={ post.user.image }
                        >{ post.user.name }</Avatar>
                    }
                    title={
                        <div className={classes.titleContainer}>
                            <Typography variant="h6">{ post.user.name }</Typography>
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
                        <Box> { cardBottomToolBox() } </Box>
                    </Box>
                </Container>
            </Paper>
        </GridListTile>
    )

}

export default PostCard