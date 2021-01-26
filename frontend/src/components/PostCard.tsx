import { Post } from '../store/post';
import { Paper, CardHeader, makeStyles, Typography, Avatar, GridListTile, Container, Chip } from '@material-ui/core'
import PostContextMenu from './PostContextMenu'

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
        overflowWrap: 'anywhere'
    },
    tags: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
        flexWrap: 'wrap'
    }

}))

function PostCard({post, columnWidth, isSingleColumn}: Props) {
    const classes = useStyles({
        postColor: post.color,
        cardWidth: columnWidth * post.column_size,
        cardHeight: columnWidth,
        isSingleColumn
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
                    <Typography component="div" className={classes.content} dangerouslySetInnerHTML={{__html: post.raw_content}} />
                </Container>
            </Paper>
        </GridListTile>
    )

}

export default PostCard