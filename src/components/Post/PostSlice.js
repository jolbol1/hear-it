import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const loadPost = createAsyncThunk(
    'post/loadPost',
    async (permalink) => {
        const response = await fetch(`https://api.reddit.com${permalink}`) 
        const json = await response.json();
        return json;
    }
)

const PostSlice = createSlice({
    name: 'post',
    initialState: {
        isLoadingPost: false,
        failedPostLoad: false,
        post: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadPost.pending, (state) => {
                state.isLoadingPost = true;
                state.failedPostLoad = false;
            })
            .addCase(loadPost.rejected, (state) => {
                state.isLoadingPost = false;
                state.failedPostLoad = true;
            })
            .addCase(loadPost.fulfilled, (state, action) => {
                state.isLoadingPost = false;
                state.failedPostLoad = false;
                state.post = {
                    title: action.payload[0].data.children[0].data.title,
                    selftext: action.payload[0].data.children[0].data.selftext,
                    comments: action.payload[1].data.children.filter((comment) => !comment.data.stickied).map((comment) => comment.data.body),
                    isSelf: action.payload[0].data.children[0].data['is_self'],
                    url: action.payload[0].data.children[0].data.url
                }
            })
    }
})

export const getPost = state => state.post.post

export default PostSlice.reducer