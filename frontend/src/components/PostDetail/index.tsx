import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchPost } from '../../store/post'
import { RootState } from '../../store/index'
import Detail from './Detail'

type ParamsType = {
    post_id?: string
}

function PostDetail() {
    const dispatch = useDispatch()
    const detailPost = useSelector((state: RootState) => (state.post.detailPost))
    let { post_id }  = useParams<ParamsType>()

    useEffect(() => {
        const fn = async () => {
            if(post_id) await dispatch(fetchPost(parseInt(post_id!)))
        }
        fn()
    }, [dispatch, post_id])

    return <div>
        {
            detailPost === undefined
            ? <div></div>
            : <Detail post={detailPost}></Detail>
        }
        </div>
}

export default PostDetail