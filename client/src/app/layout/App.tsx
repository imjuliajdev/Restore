import { Box, Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"


function App() {


  return (
    <>
    <NavBar />
    <Box 
      sx={{
        minHeight:'100vh',
        py:6,
        backgroundColor:'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
      }}
      >
         <Container maxWidth='xl' sx={{mt: 8}}>
      <Outlet />  
   </Container>
    </Box>
    </>
  )
}

export default App
