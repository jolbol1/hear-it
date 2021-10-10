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


export const PostViewer = () => {
    const dispatch = useDispatch();
    const [subInput, setSubInput] = useState('AskReddit')
    const subreddit = useSelector(getSelectedSubreddit)
    const postIndex = useSelector(getPostIndex)

    useEffect(() => {
        dispatch(loadPostsForSelectedSub(subreddit))
        dispatch(setCurrentPostIndex(0))
    }, [subreddit])

    return (
        <Grid container
              spacing={2}
              alignItems="center"
              justifyContent="center"
              columnSpacing={{xs: 1, sm: 2, md: 3}}
              direction="column"
        >
            <Grid item xs={4}>
                <Stack spacing={2}>
                    <TextField
                        id="subreddit-input"
                        label="Subreddit"
                        value={subInput}
                        onChange={(e) => setSubInput(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        style={{marginTop: 0, marginBottom: 8}}
                        onClick={() => dispatch(setSelectedSubreddit(subInput))}
                    >
                        Load</Button>
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