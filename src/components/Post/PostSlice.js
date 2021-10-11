import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
const KEY = 'REDCATED'

export const loadPost = createAsyncThunk(
    'post/loadPost',
    async ({permalink, sort}) => {
        const response = await fetch(`https://api.reddit.com${permalink}.json?limit=100&sort=${sort}`) 
        const json = await response.json();
        if(json[0].data.children[0].data.url) {
            const embed = await fetch(`https://cdn.iframe.ly/api/iframely?url=${encodeURIComponent(json[0].data.children[0].data.url)}&api_key=${KEY}&iframe=1&omit_script=1`)
            const json1 = await embed.json()
            json[0].data.children[0].data.embed = json1.html
        }

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
                    comments: action.payload[1].data.children.filter((comment) => !comment.data.stickied).map((comment) => ({ 
                        body: comment.data.body,
                        author: comment.data.author
                    })),
                    isSelf: action.payload[0].data.children[0].data['is_self'],
                    url: action.payload[0].data.children[0].data.url,
                    author: action.payload[0].data.children[0].data.author,
                    embed: action.payload[0].data.children[0].data.embed
                    
                }
            })
    }
})

export const getPost = state => state.post.post
export const getIsLoadingPost = state => state.post.isLoadingPost

export default PostSlice.reducer