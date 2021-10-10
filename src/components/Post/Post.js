import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {getPost, loadPost} from "./PostSlice";
import {useDispatch, useSelector} from "react-redux";
import {getPostIndex, getPosts} from "../../features/PostViewer/PostViewerSlice";
import {useEffect, useState} from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import {useSpeechSynthesis} from "react-speech-kit";


export const Post = (props) => {
    const dispatch = useDispatch();
    const post = useSelector(getPost);
    const posts = useSelector(getPosts);
    const postIndex = useSelector(getPostIndex)
    const onEnd = () => {
        setTimeout(() => {
            setCommentId(commentId + 1)
        }, 2000)
    }
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
        onEnd,
    });    const [commentId, setCommentId] = useState(0);
    const [playComment, setPlayComment] = useState(false)


    useEffect(() => {
        cancel()
        setCommentId(0)
        setPlayComment(false)
        dispatch(loadPost(posts[postIndex]))
    }, [posts, postIndex])

    useEffect(() => {
        if (playComment) {
            console.log(post.comments[commentId])
            speak({text: post.comments[commentId]})
        }
        return cancel
    }, [playComment, commentId])

    const onPlayComments = () => {
        setPlayComment(true)
    }

    const onPauseComment = () => {
        if(speaking) {
            cancel()
        }
        setPlayComment(false)
    }

    return (
        <Card>
            <CardActionArea>
                {!post.isSelf && <CardMedia
                    component="img"
                    image={post.url}
                    alt="post image"
                />}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" textAlign="center">
                        {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post.selftext}
                    </Typography>
                </CardContent>
                {playComment ? <PauseCircleIcon onClick={onPauseComment} style={{width: '100%', height: '50px'}}/> : <PlayCircleIcon style={{width: '100%', height: '50px'}} onClick={onPlayComments}/>}
            </CardActionArea>
        </Card>
    )
}