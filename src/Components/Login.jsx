import React from 'react'
import { CardContent,Card,Box, Stack, TextField, Typography, Button, Container, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../features/authSlice'

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const callLogin = (e) => {
        e.preventDefault()
        const email = (e.target.email.value)
        const pass = (e.target.pass.value)
        const role = e.target.role.value
        const data = {
            name: 'Manav Raj',
            role: parseInt(role), // Admin
            email: email,
            password: pass
        }
        dispatch(setAuthData(data))

        // check login credentials and navigate to /dashboard
        
        navigate('/dashboard')
        
    }
  return (
    <Box sx={{display:"flex", backgroundColor:'#051F3D', flexDirection:"column", alignItems:"center",justifyContent:"center",  height:"100vh"}}>
        <Card className='testtt'  elevation={3} variant='outlined' sx={{margin:"0.5px", minWidth: '30rem', borderRadius: '1rem', boxShadow: '0 0 50px 10px #7EB4F640'}} >
        
            <CardContent sx={{margin: '2rem'}}>
                {/* <Stack> */}
                    <Typography variant="h4" color="#000"  >Welcome Back!</Typography>
                    <Typography variant="subtitle1" color="#000" marginTop="5px">Sing in to your account.</Typography>
                    <form onSubmit={callLogin} style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:"40px"}}>
                        <TextField name='email' fullWidth required label={'Email'} type='email' style={{color:"#000", }}>Enter your mail</TextField>
                        <TextField name='pass' fullWidth required label={'Password'} type='password' sx={{marginTop:"30px"}}></TextField>
                        <TextField name='role' fullWidth required label={'role'} type='number' sx={{marginTop:"30px"}}></TextField>
                        <Button sx={{mt: '2rem'}} variant='contained' type='submit' >Sign in</Button>
                    </form>
                {/* </Stack> */}
            </CardContent>
        </Card>
   </Box>
  )
}

export default Login