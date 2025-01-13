import { TextField, Button, Box, Typography, Container, Paper } from "@mui/material"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, registerSchema } from "../../lib/schemas/registerSchema";
import { useRegisterMutation } from "./accountApi";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function RegisterForm() {
    const [registerUser] = useRegisterMutation();

    const {register, handleSubmit, setError,formState: {errors, isValid,isLoading}, } = useForm<RegisterSchema>({
        mode: "onTouched",
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async(data: RegisterSchema) => {
       try {
        await registerUser(data).unwrap();
       } catch (error) {
        const apiError = error as {message: string};
        if(apiError.message && typeof apiError.message === "string") {
            const errorArray = apiError.message.split(", ");
            errorArray.forEach(e => {
                if(e.includes("Password")) {
                    setError("password", {message: e});
                } else if(e.includes("Email")) {
                    setError("email", {message: e});
                }
            });
        }
       }
    }

    return (
        <Container component = {Paper} maxWidth = "sm" sx = {{borderRadius: 3}}>

        <Box display = "flex" flexDirection = "column" alignItems = "center" marginTop = {8}>
        <LockOutlinedIcon sx={{color: "secondary.main",mt:3,fontSize:40}} />
        <Typography variant = "h5">
            Register
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
            <Button type = "submit" variant = "contained" disabled = {isLoading || !isValid}>
                Register
            </Button>
            <Typography variant = "body2" sx={{textAlign: "center"}}>
                Already have an account? 
                <Typography component = {Link} to = "/login" color="primary">
                   Sign in here
                </Typography>
            </Typography>
        </Box>
            </Box>        
                    
    </Container>        
    )
}
