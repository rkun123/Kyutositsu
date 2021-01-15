import { Post } from "../store/post";
import { Card, CardContent, CardHeader, makeStyles, Typography, Avatar} from '@material-ui/core'
import { typography } from "@material-ui/system";

type Prop = {
    post: Post
}

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2)
    },
    title: {
        fontWeight: "bold"
    }
}))

function PostCard({post}: Prop) {
    const classes = useStyles()

    return (
        <Card key={post.id} className={classes.card}>
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
            <CardContent>
                <Typography variant="h6" className={ classes.title }>
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