import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {getIsLoadingPost, getPost, loadPost} from "./PostSlice";
import {useDispatch, useSelector} from "react-redux";
import {getLoadingPosts, getPostIndex, getPosts, setCurrentPostIndex} from "../../features/PostViewer/PostViewerSlice";
import {useEffect, useState} from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import {useSpeechSynthesis} from "react-speech-kit";
import {setComment} from "../comment/CommentSlice";

import {
    getCommentSortMethod,
    getCommentSortMethods,
    getSettings,
    getSortMethods,
    setCurrentVoiceID,
    setVoices
} from "../Options/OptionsSlice";


let myTimeout;

function myTimer() {
    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
    myTimeout = setTimeout(myTimer, 10000);
}

export const Post = (props) => {
    const dispatch = useDispatch();
    const isLoadingPosts = useSelector(getLoadingPosts)
    const isLoadingPost = useSelector(getIsLoadingPost)
    const post = useSelector(getPost);
    const {currentVoiceID, commentLimit, autoNextPost} = useSelector(getSettings)
    const posts = useSelector(getPosts);
    const [postAnnounced, setPostAnnounced] = useState(false)
    const postIndex = useSelector(getPostIndex)
    const {announceAuthor, announcePost} = useSelector(getSettings)
    const [startCommentId, setStartCommentId] = useState(0)
    const commentSortMethod = useSelector(getCommentSortMethod)
    const sortMethods = useSelector(getCommentSortMethods)
    const sortMethod = sortMethods[commentSortMethod]
    const onEnd = () => {
        setTimeout(() => {
            clearTimeout(myTimeout)
            if (postAnnounced || !announcePost) {
                setCommentId(commentId + 1)
            } else if (!postAnnounced && announcePost) {
                setPostAnnounced(true)
            }
        }, 1500)
    }
    const {speak, cancel, speaking, supported, voices} = useSpeechSynthesis({
        onEnd,
    });
    const [commentId, setCommentId] = useState(0);
    const [playComment, setPlayComment] = useState(false)
    let voice = voices[currentVoiceID] || null

    useEffect(() => {
        console.log(window.navigator.language)
        dispatch(setVoices(voices))
        voice = voices.find((voice, index) => {
            if (voice.lang.toString() === window.navigator.language) {
                dispatch(setCurrentVoiceID(index))
                return true;
            }
        }) || voices[currentVoiceID] || null
    }, [voices])

    useEffect(() => {
        if (!isLoadingPost && !isLoadingPosts) {
            cancel()
            if (!autoNextPost) {
                setPlayComment(false)
            }
            dispatch(loadPost({ permalink: posts[postIndex], sort: sortMethod}))
            setCommentId(0)
            setPostAnnounced(false)
        }
    }, [postIndex, posts, commentSortMethod])

    useEffect(() => {
        if (post.comments && post.comments.length > 0) {
            console.log("Comments", post.comments)
            dispatch(setComment({
                id: commentId,
                body: post.comments[commentId].body,
                author: post.comments[commentId].author
            }))
        } else {
            dispatch(setComment({
                id: 0,
                body: 'No Comments For This Post',
                author: 'HearIt'
            }))
        }
    }, [post])

    useEffect(() => {
        if (!isLoadingPosts && !isLoadingPost) {
            if (post.comments && post.comments.length > 0) {
                dispatch(setComment({
                    id: commentId,
                    body: post.comments[commentId].body,
                    author: post.comments[commentId].author
                }))
                if (playComment && commentId < commentLimit + startCommentId) {
                    console.log(post.comments[commentId])
                    const {body, author} = post.comments[commentId]
                    let speechString;
                    if (commentId === 0 && announcePost && !postAnnounced) {
                        console.log("Post", post)
                        speechString = announceAuthor ? `${post.author} says... ${post.title}... ${post.body || ''}` : `${post.title}... ${post.body || ''}`
                    } else {
                        speechString = announceAuthor ? `${author} says... ${body}` : body
                    }
                    window.speechSynthesis.cancel();
                    myTimeout = setTimeout(myTimer, 10000);
                    speak({text: speechString, voice: voice})

                } else if (commentId >= commentLimit + startCommentId) {
                    if (autoNextPost) {
                        dispatch(setCurrentPostIndex(postIndex + 1))
                    } else {
                        setPlayComment(false)
                        setStartCommentId(commentId)
                    }
                }
            } else {
                dispatch(setComment({
                    id: 0,
                    body: 'No Comments For This Post',
                    author: 'HearIt'
                }))
            }
        }
        return cancel
    }, [playComment, commentId, postAnnounced, isLoadingPost, isLoadingPosts])

    const onPlayComments = () => {
        setPlayComment(true)
    }

    const onPauseComment = () => {
        if (speaking) {
            cancel()
        }
        setPlayComment(false)
    }

    return (
        <Card >
            <CardActionArea>
                {<div dangerouslySetInnerHTML = {
                    { __html: post.embed}
                }/>}
                <CardContent>
                    {!post.selftext && <Typography gutterBottom variant="h5" component="div" textAlign="center">
                        {post.title}
                    </Typography>}
                    {!post.selftext && <Typography variant="body2" color="text.secondary">
                        {post.selftext}
                    </Typography>}
                </CardContent>
                {playComment ? <PauseCircleIcon onClick={onPauseComment} style={{width: '100%', height: '50px'}}/> :
                    <PlayCircleIcon style={{width: '100%', height: '50px'}} onClick={onPlayComments}/>}
            </CardActionArea>
        </Card>
    )
}