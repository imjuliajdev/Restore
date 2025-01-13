import { Paper, Container,Typography, Box, TextField, Button} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "../../lib/schemas/loginSchema";
import { useLazyUserInfoQuery, useLoginMutation } from "./accountApi";

export default function LoginForm() {
    const [login, {isLoading}] = useLoginMutation();
    const [fetchUserInfo] = useLazyUserInfoQuery();
    const location = useLocation();

    const {register, handleSubmit, formState: {errors}} = useForm<LoginSchema>({
        mode: "onTouched",
        resolver: zodResolver(loginSchema)
    });
    const navigate = useNavigate();         

    const onSubmit = async(data: LoginSchema) => {
        await login(data);
        await fetchUserInfo();
        navigate(location.state?.from || '/catalog');
    }

    return(
        <Container component = {Paper} maxWidth = "sm" sx = {{borderRadius: 3}}>

            <Box display = "flex" flexDirection = "column" alignItems = "center" marginTop = {8}>
            <LockOutlinedIcon sx={{color: "secondary.main",mt:3,fontSize:40}} />
            <Typography variant = "h5">
                Sign in
            </Typography>
            <Box 
                component = "form"
                onSubmit = {handleSubmit(onSubmit)}
                width = "100%"
                display = "flex"
                flexDirection = "column"
                gap = {3}
                marginY = {3}
                >
                <TextField
                    label = "Email"
                    autoFocus
                    fullWidth
                    {...register("email")}
                    error = {!!errors.email}
                    helperText = {errors.email?.message}
                />
                <TextField
                    label = "Password"
                    type = "password"
                    fullWidth
                    {...register("password")}
                    error = {!!errors.password}
                    helperText = {errors.password?.message}
                />
                <Button type = "submit" variant = "contained" disabled = {isLoading}>
                    Sign in
                </Button>
                <Typography variant = "body2" sx={{textAlign: "center"}}>
                    Don't have an account? 
                    <Typography component = {Link} to = "/register" color="primary">
                        Register
                    </Typography>
                </Typography>
            </Box>
                </Box>        
                        
        </Container>
    )
}