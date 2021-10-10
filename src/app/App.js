import {AppBar, Typography} from "@mui/material";
import {PostViewer} from "../features/PostViewer/PostViewer";

//Test Git
function App() {
    return (
        <div className="App">
            <AppBar position="static">
                <Typography variant="h6" color="inherit" component="div" align="center">
                    Hear<span style={{color: 'red'}}>It</span>
                </Typography>
            </AppBar>
            <PostViewer/>
        </div>
    );
}

export default App;
