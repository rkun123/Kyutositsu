import { Post } from "../store/post";
import { Paper, CardContent, CardHeader, makeStyles, Typography, Avatar, GridListTile, Container} from '@material-ui/core'
import { typography } from "@material-ui/system";

type Props = {
    post: Post
}

type StyleProps = {
    postColor: string
}

const useStyles = makeStyles((theme) => ({
    tile: {
        margin: 'none'
    },
    card: {
        width: '300px',
        height: '300px',
        backgroundColor: (props: StyleProps) => (props.postColor)
    },
    title: {
        fontWeight: "bold"
    },
    content: {
        width: '100%',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
    }
}))

function PostCard({post}: Props) {
    const classes = useStyles({
        postColor: post.color
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
                        <Typography variant="h6">{ post.user.name }</Typography>
                    }
                    subheader={ post.created_at }
                >
                </CardHeader>
                <Container>
                    <Typography component="pre" className={classes.content}>
                        { post.content }
                    </Typography>
                </Container>
            </Paper>
        </GridListTile>
    )

}

export default PostCard