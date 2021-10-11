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

    return (
        <Grid container
              spacing={5}
              alignItems="center"
              justifyContent="center"
              direction="column"
        >
            <Grid item marginBottom={2}>
                <Stack spacing={1}>
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
            <Grid container
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  columnSpacing={{xs: 1, sm: 2, md: 3}}
            >
                <Grid
                    container xs={2}
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
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
                <Grid item xs={8}>
                    <Options open={open} setOpen={setOpen}/>
                    <Post/>
                    <Comment/>
                </Grid>
                <Grid item xs={2}>
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
            </Grid>
        </Grid>
    )
}