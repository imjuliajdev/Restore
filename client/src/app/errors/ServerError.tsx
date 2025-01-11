import { useLocation } from "react-router-dom";
import { Paper, Typography, Divider } from "@mui/material";

export default function ServerError() {
    const {state} = useLocation();

    return (
       <Paper>
        {state.error ? (
            <>
                <Typography gutterBottom variant="h3" color="secondary" sx={{px: 4, pt: 2}}>
                    {state.error.title}
                </Typography>
                <Divider />
                <Typography variant="body1" sx={{p: 4, pb: 2}}>
                    {state.error.detail}
                </Typography>
            </>
        ) : (
            <Typography gutterBottom variant="h5">Server Error</Typography>
        )}
       </Paper>
    )
}
