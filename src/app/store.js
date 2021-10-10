import {configureStore} from "@reduxjs/toolkit";
import PostViewerReducer from '../features/PostViewer/PostViewerSlice'
import PostReducer from '../components/Post/PostSlice'

export default configureStore({
    reducer: {
        postview: PostViewerReducer,
        post: PostReducer
    }
})