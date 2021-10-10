import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {getPost, loadPost} from "./PostSlice";
import {useDispatch, useSelector} from "react-redux";
import {getPostIndex, getPosts} from "../../features/PostViewer/PostViewerSlice";
import {useEffect, useState} from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import {useSpeechSynthesis} from "react-speech-kit";
import {setComment} from "../comment/CommentSlice";


export const Post = (props) => {
    const dispatch = useDispatch();
    const post = useSelector(getPost);
    const posts = useSelector(getPosts);
    const [postAnnounced, setPostAnnounced] = useState(false)
    const postIndex = useSelector(getPostIndex)
    const announceAuthor = true;
    const announcePost = true;
    const onEnd = () => {
        setTimeout(() => {
            if(postAnnounced || !announcePost) {
                setCommentId(commentId + 1)
            } else if(!postAnnounced && announcePost) {
                setPostAnnounced(true)
            }
        }, 1500)
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
        if(post.comments) {
            dispatch(setComment({
                id: commentId,
                body: post.comments[0].body,
                author: post.comments[0].author
            }))
        }
    }, [post])
    
    useEffect(() => {
        if(post.comments) {
            dispatch(setComment({
                id: commentId,
                body: post.comments[0].body,
                author: post.comments[0].author
            }))
            if (playComment) {
                console.log(post.comments[commentId])
                const {body, author} = post.comments[commentId]
                let speechString;
                if (commentId === 0 && announcePost && !postAnnounced) {
                    speechString = announceAuthor ? `${author} says... ${post.title}... ${post.body || ''}` : `${post.title}... ${post.body || ''}`
                } else {
                    speechString = announceAuthor ? `${author} says... ${body}` : body
                }
                speak({text: speechString})
            }
        }
        return cancel
    }, [playComment, commentId, postAnnounced])

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