import {
    Button,
    Fab,
    Grid,
    Stack,
    TextField,
} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getPostIndex,
    getSelectedSubreddit,
    loadPostsForSelectedSub, setCurrentPostIndex,
    setSelectedSubreddit
} from "./PostViewerSlice";
import {Post} from "../../components/Post/Post";
import {Comment} from "../../components/comment/Comment";
import {Options} from "../../components/Options/Options";
import {
    getPostSortMethod,
    getPostSortMethods,
    getPostSortTime,
    getSortTimes
} from "../../components/Options/OptionsSlice";


export const PostViewer = () => {
    const dispatch = useDispatch();
    const [subInput, setSubInput] = useState('AskReddit')
    const subreddit = useSelector(getSelectedSubreddit)
    const postIndex = useSelector(getPostIndex)
    const [open, setOpen] = useState(false)
    const postSortMethod = useSelector(getPostSortMethod)
    const sortMethods = useSelector(getPostSortMethods)
    const sortMethod = sortMethods[postSortMethod]
    const sortTimes = useSelector(getSortTimes)
    const currentSortTime = useSelector(getPostSortTime)
    const sortTime = sortTimes[currentSortTime]

    useEffect(() => {
        console.log(sortTime)
        dispatch(loadPostsForSelectedSub({sub: subreddit, sort: sortMethod, sortTime: sortTime}))
        dispatch(setCurrentPostIndex(0))
    }, [subreddit, postSortMethod, currentSortTime])

    //TODO - At 500px add the controls to their own card, extend remaining components to fill screen.
    return (
        <Grid x={{ flexGrow: 1 }} container spacing={2}
              height="100vh"
        >
            <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
                <Stack spacing={1} width="500px">
                    <TextField
                        id="subreddit-input"
                        label="Subreddit"
                        value={subInput}
                        onChange={(e) => setSubInput(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        onClick={() => dispatch(setSelectedSubreddit(subInput))}
                    >
                        Load</Button>
                    <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                    >
                        Options</Button>
                </Stack>
            </Grid>

            <Grid item xs={2} display="flex" alignItems="center" justifyContent="center">
                <Fab
                    variant="extended"
                    color="primary"
                    aria-label="previous post"
                    onClick={() => dispatch(setCurrentPostIndex(postIndex - 1))}
                >
                    <ArrowBackIosNewIcon/>
                    Prior
                </Fab>
            </Grid>
            <Grid item xs maxHeight="100%">
                <Post/>
                <Comment/>
            </Grid>
            <Grid item xs={2} display="flex" alignItems="center" justifyContent="center">
                <Fab
                    variant="extended"
                    color="primary"
                    aria-label="next post"
                    onClick={() => dispatch(setCurrentPostIndex(postIndex + 1))}
                >
                    <ArrowForwardIosIcon/>
                    Next
                </Fab>
            </Grid>
            <Options open={open} setOpen={setOpen}/>
        </Grid>
    )
}