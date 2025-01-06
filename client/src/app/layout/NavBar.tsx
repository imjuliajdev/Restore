import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";

const navLinks = [
    {title: 'Home', path: '/'},
    {title: 'Catalog', path: '/catalog'},
    {title: 'About', path: '/about'},
    {title: 'Contact', path: '/contact'},
    {title: 'Blog', path: '/blog'},
]
const authLinks = [
    {title: 'Login', path: '/login'},
    {title: 'Register', path: '/register'},
]

const navStyles = {
    color: 'white',
    typography: 'h6',
    textDecoration: 'none',
    '&:hover': {
        color: 'grey.500',
    },
    '&.active': {
        color: '#bae0ff',
    },
}
export default function NavBar() {
    const {isLoading} = useAppSelector(state => state.ui);  
    return (
        <AppBar position='fixed' sx={{backgroundColor: '#121212', mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box>
                    <Typography component={NavLink} to='/' variant='h6' sx={{color: 'inherit', textDecoration: 'none'}}>RE-STORE</Typography>
                </Box>
                <List sx={{display:'flex', alignItems: 'center'}}>
                    {navLinks.map(({title, path}) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                </List>
                <Box display='flex' alignItems='center'>
                    <IconButton size="large" sx={{color: 'inherit'}}>
                        <Badge badgeContent={4} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    
                    <List sx={{display:'flex'}}>
                            {authLinks.map(({title, path}) => (
                                    <ListItem
                                        component={NavLink}
                                        to={path}
                                        key={path}
                                        sx={navStyles}
                                    >
                                        {title.toUpperCase()}
                                    </ListItem>
                                ))}
                        </List>
                </Box>

            </Toolbar>
            {isLoading && 
                <Box sx={{width: '100%'}}>
                    <LinearProgress color="secondary" />
                </Box>
            }
        </AppBar>
    )
}