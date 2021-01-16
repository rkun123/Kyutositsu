import { Post } from "../store/post";
import { Paper, CardContent, CardHeader, makeStyles, Typography, Avatar, GridListTile, Container} from '@material-ui/core'
import { typography } from "@material-ui/system";

type Prop = {
    post: Post
}

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        width: '100%',
        height: '100%'
    },
    title: {
        fontWeight: "bold"
    },
    content: {
        width: '100%',
        wordWrap: 'break-word'
    }
}))

function PostCard({post}: Prop) {
    const classes = useStyles()

    return (
        <GridListTile
            cols={1}
            rows={1}
        >
            <Paper
                key={post.id}
                className={classes.card}
                square
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
                    <Typography component="p" className={classes.content}>
                        { post.content.slice(0, 60) }
                    </Typography>
                </Container>
            </Paper>
        </GridListTile>
    )

}

export default PostCard