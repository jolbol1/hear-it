import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {getComment} from "./CommentSlice";



export const Comment = (props) => {
    const {id, body, author} = useSelector(getComment)
    return (
        <Card style={{ marginTop: 20}}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" textAlign="left">
                        Current Comment
                    </Typography>
                    <Typography variant="body3" color="text.secondary">
                        {author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {body}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}