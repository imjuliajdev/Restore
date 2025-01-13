import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useFetchCartQuery } from "../../features/cart/cartApi";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../../features/account/accountApi";

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
    const {data: user} = useUserInfoQuery();
    const {isLoading} = useAppSelector(state => state.ui); 
    const {data: cart} = useFetchCartQuery();

    //calculate total items in cart
    const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
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
                    <IconButton 
                        component={Link}
                        to='/cart'
                        size="large" 
                        sx={{color: 'inherit'}}
                    >
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    {user ? (<UserMenu user={user} /> ): (
                    
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
                    )}
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