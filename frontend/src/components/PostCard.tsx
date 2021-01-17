import { Post } from "../store/post";
import { Paper, CardContent, CardHeader, makeStyles, Typography, Avatar, GridListTile, Container} from '@material-ui/core'
import { typography } from "@material-ui/system";

type Prop = {
    post: Post
}

const useStyles = makeStyles((theme) => ({
    tile: {
        margin: 'none'
    },
    card: {
        margin: '5px',
        width: '300px',
        height: '300px'
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

function PostCard({post}: Prop) {
    const classes = useStyles()

    return (
        <GridListTile
            className={classes.tile}
        >
            <Paper
                key={post.id}
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