import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const loadPostsForSelectedSub = createAsyncThunk(
    'postview/loadPosts',
    async (sub) => {
        const response = await fetch(`https://api.reddit.com/r/${sub}.json`)
        const json = await response.json()
        const postURLs = json.data.children.filter((post) => !post.data.stickied).map((post) => post.data.permalink)
        return postURLs
    }
)


const PostViewerSlice = createSlice({
    name: 'postview',
    initialState: {
        selectedSubreddit: 'AskReddit',
        posts: [],
        isLoadingPosts: false,
        failedToLoadPosts: false,
        currentPostIndex: 0
    },
    reducers: {
        setSelectedSubreddit(state, action) {
            state.selectedSubreddit = action.payload
        },
        setCurrentPostIndex(state, action) {
            state.currentPostIndex = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadPostsForSelectedSub.pending, (state) => {
                state.isLoadingPosts = true
                state.failedToLoadPosts = false
            })
            .addCase(loadPostsForSelectedSub.rejected, (state) => {
                state.isLoadingPosts = false
                state.failedToLoadPosts = true
            })
            .addCase(loadPostsForSelectedSub.fulfilled, (state, action) => {
                state.isLoadingPosts = false
                state.failedToLoadPosts = false
                state.posts = action.payload
            })
    }
})

export const getPosts = state => state.postview.posts
export const getPostIndex = state => state.postview.currentPostIndex
export const getSelectedSubreddit = state => state.postview.selectedSubreddit
export const { setSelectedSubreddit, setCurrentPostIndex } = PostViewerSlice.actions
export default PostViewerSlice.reducer
