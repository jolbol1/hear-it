import {Card, CardActionArea, CardContent, Typography} from "@mui/material";



export const Comment = (props) => {
    const commentBody = props.commentBody;
    const commentAuthor = props.commentAuthor;
    
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" textAlign="left">
                        Current Comment
                    </Typography>
                    <Typography variant="body3" color="text.secondary">
                        {commentAuthor}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {commentBody}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}