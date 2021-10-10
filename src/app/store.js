import {configureStore} from "@reduxjs/toolkit";
import PostViewerReducer from '../features/PostViewer/PostViewerSlice'
import PostReducer from '../components/Post/PostSlice'
import CommentReducer from '../components/comment/CommentSlice'

export default configureStore({
    reducer: {
        postview: PostViewerReducer,
        post: PostReducer,
        comment: CommentReducer
    }
})