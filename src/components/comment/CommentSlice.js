const {createSlice} = require("@reduxjs/toolkit");


const CommentSlice = createSlice({
    name: 'comment',
    initialState: {
        body: '',
        author: '',
        id: 0
    },
    reducers: {
        setComment(state, action) {
            const { body, author, id} = action.payload
            state.body = body;
            state.author = author;
            state.id = id;
        }
    }
})

export const getComment = state => ({
    body: state.comment.body,
    author: state.comment.author,
    id: state.comment.id
})
export const { setComment } = CommentSlice.actions;
export default CommentSlice.reducer