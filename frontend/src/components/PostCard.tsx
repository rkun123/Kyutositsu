import { Post } from "../store/post";
import { Card, CardContent, makeStyles, Typography} from '@material-ui/core'

type Prop = {
    post: Post
}

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2)
    }
}))

function PostCard({post}: Prop) {
    const classes = useStyles()

    return (
        <Card key={post.id} className={classes.card}>
            <CardContent>
                <Typography variant="h5">
                    { post.title }
                </Typography>
                <Typography component="p">
                    { post.content }
                </Typography>
            </CardContent>
        </Card>
    )

}

export default PostCard