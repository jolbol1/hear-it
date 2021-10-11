import {
    Button,
    Checkbox,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    getSettings,
    setAnnounceAuthor,
    setAnnouncePost,
    setAutoNextPost,
    setCommentLimit, setCommentSortMethod,
    setCurrentVoiceID, setPostSortMethod, setPostSortTime
} from "./OptionsSlice";


export const Options = (props) => {
    const dispatch = useDispatch();
    const {open, setOpen} = props;
    const { announcePost, announceAuthor, voices, currentVoiceID, autoNextPost, commentLimit, commentSortMethod, postSortMethod, postSortMethods, commentSortMethods, sortTimes, postSortTime} = useSelector(getSettings)
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const sortPostMenuItems = postSortMethods.map((item, index) => {
        if(item === 'confidence') { item = 'best'}
        return <MenuItem value={index}>{item}</MenuItem>
    })

    const sortCommentMenuItems = commentSortMethods.map((item, index) => {
        if(item === 'confidence') { item = 'best'}
        return <MenuItem value={index}>{item}</MenuItem>
    })

    const sortTimesMenuItems = sortTimes.map((item, index) => {
        return <MenuItem value={index}>{item}</MenuItem>
    })


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Options</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit these options below, and hit close to apply.
                </DialogContentText>
                <FormGroup>
                    <FormControl fullWidth>
                        <InputLabel id="post-sort-select-label">Post Sort</InputLabel>
                        <Select
                            labelId="post-sort-select-label"
                            id="post-sort-simple-select"
                            value={postSortMethod}
                            label="Post Sort"
                            onChange={(e) => dispatch(setPostSortMethod(e.target.value)) }
                        >
                            {sortPostMenuItems}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="post-sort-time-select-label">Post Sort Time</InputLabel>
                        <Select
                            labelId="post-sort-time-select-label"
                            id="post-sort-simple-select"
                            value={postSortTime}
                            label="Post Sort Time"
                            onChange={(e) => dispatch(setPostSortTime(e.target.value)) }
                        >
                            {sortTimesMenuItems}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="post-sort-select-label">Comment Sort</InputLabel>
                        <Select
                            labelId="post-sort-select-label"
                            id="post-sort-simple-select"
                            value={commentSortMethod}
                            label="Post Sort"
                            onChange={(e) => dispatch(setCommentSortMethod(e.target.value)) }
                        >
                            {sortCommentMenuItems}
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={announcePost}
                                onChange={(e) => dispatch(setAnnouncePost(e.target.checked))}
                            />
                        }
                        label="Announce Post"/>
                    <FormControlLabel 
                        control={
                            <Checkbox
                                checked={announceAuthor}
                                onChange={(e) => dispatch(setAnnounceAuthor(e.target.checked))}
                            />
                        } 
                        label="Announce Author"/>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={autoNextPost}
                                onChange={(e) => dispatch(setAutoNextPost(e.target.checked))}
                            />
                        }
                        label="Auto Next Post"/>
                    <TextField
                        id="comment-limit"
                        inputProps={{ type: 'number'}}
                        label="Comments per Post"
                        value={commentLimit}
                        onChange={(e) => dispatch(setCommentLimit(parseInt(e.target.value)))}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="voice-select-label">Voice</InputLabel>
                        <Select
                            labelId="voice-select-label"
                            id="voice-simple-select"
                            value={currentVoiceID}
                            label="Age"
                            onChange={(e) => dispatch(setCurrentVoiceID(e.target.value))}
                        >
                            {voices.map((voice, index) => {
                                return (<MenuItem key={index} value={index}>{`${voice.name} - ${voice.lang}`}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}