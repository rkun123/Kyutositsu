import { Post } from '../store/post';
import { Paper, CardHeader, makeStyles, Typography, Avatar, GridListTile, Container, Chip } from '@material-ui/core'
import PostContextMenu from './PostContextMenu'

type Props = {
    post: Post,
    cardWidth: number
}

type StyleProps = {
    postColor: string,
    cardWidth: number
}

const useStyles = makeStyles((theme) => ({
    tile: {
        margin: 'none'
    },
    card: {
        width: (props: StyleProps) => (`${props.cardWidth}px`),
        height: (props: StyleProps) => (`${props.cardWidth}px`),
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
        whiteSpace: 'pre-wrap'
    },
    tags: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    }

}))

function PostCard({post, cardWidth}: Props) {
    const classes = useStyles({
        postColor: post.color,
        cardWidth
    })

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
                        >{ post.user.name[0] }</Avatar>
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
                    <Typography component="pre" className={classes.content}>
                        { post.content }
                    </Typography>
                </Container>
            </Paper>
        </GridListTile>
    )

}

export default PostCard