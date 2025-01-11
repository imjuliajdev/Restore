import { Paper,Typography, Button } from "@mui/material";
import { SearchOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Paper
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400',
            p:6
        }}>
            <SearchOff sx={{fontSize: 100}} color="primary"/>
            <Typography variant="h5">Oops - we could not find what you were looking for</Typography>
            <Button fullWidth component={Link} to="/catalog" variant="contained" sx={{mt: 3}}>Go back to shop</Button>
        </Paper>
    )
}