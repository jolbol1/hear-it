const {createSlice} = require("@reduxjs/toolkit");

const OptionsSlice = createSlice({
    name: 'options',
    initialState: {
        announcePost: true,
        announceAuthor: true,
        voices: [],
        currentVoiceID: 0,
        autoNextPost: true,
        commentLimit: 5,
        postSortMethod: 0,
        commentSortMethod: 0,
        commentSortMethods: ['confidence', 'top', 'new', 'controversial', 'old', 'qa'],
        postSortMethods: ['hot', 'best', 'top', 'new', 'controversial', 'rising'],
        sortTimes: ['default', 'hour', 'day', 'week', 'month', 'year', 'all'],
        postSortTime: 0,
    },
    reducers: {
        setAnnouncePost(state, action) {
            state.announcePost = action.payload
        },
        setAnnounceAuthor(state, action) {
            state.announceAuthor = action.payload
        },
        setVoices(state, action) {
            state.voices = action.payload
        },
        setCurrentVoiceID(state, action) {
            state.currentVoiceID = action.payload
        },
        setAutoNextPost(state, action) {
            state.autoNextPost = action.payload
        },
        setCommentLimit(state, action) {
            state.commentLimit = action.payload
        },
        setPostSortMethod(state, action) {
            state.postSortMethod = action.payload
        },
        setCommentSortMethod(state, action) {
            state.commentSortMethod = action.payload
        },
        setPostSortTime(state, action) {
            state.postSortTime = action.payload
        }
    }
})

export const getSettings = state => {
    return {
        announcePost: state.options.announcePost,
        announceAuthor: state.options.announceAuthor,
        voices: state.options.voices,
        currentVoiceID: state.options.currentVoiceID,
        autoNextPost: state.options.autoNextPost,
        commentLimit: state.options.commentLimit,
        commentSortMethod: state.options.commentSortMethod,
        postSortMethod: state.options.postSortMethod,
        postSortMethods: state.options.postSortMethods,
        commentSortMethods: state.options.commentSortMethods,
        sortTimes: state.options.sortTimes,
        postSortTime: state.options.postSortTime
    }
}

export const getPostSortMethod = state => state.options.postSortMethod;
export const getCommentSortMethod = state => state.options.commentSortMethod
export const getSortTimes = state => state.options.sortTimes
export const getPostSortTime = state => state.options.postSortTime
export const getCommentSortMethods = state => state.options.commentSortMethods
export const getPostSortMethods = state => state.options.postSortMethods


export const { setAnnouncePost, setAnnounceAuthor, setVoices, setCurrentVoiceID, setAutoNextPost, setCommentLimit, setPostSortMethod, setCommentSortMethod, setPostSortTime} = OptionsSlice.actions
export default OptionsSlice.reducer