import React from 'react'
import { CardContent, Card, Box, TextField, Typography, Button, } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../features/authSlice'

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const callLogin = (e) => {
        e.preventDefault()

        // extracting texts from the input boxes
        const email = (e.target.email.value)
        const pass = (e.target.pass.value)

        try {

            // retrieving the user list from local storage (if any)
            let userList = window.localStorage.getItem('users_list')

            if (userList) {
                try {
                    // trying to parse that user list from string to JSON
                    userList = JSON.parse(userList)

                    // retreiving the index of the current user from the user_list array
                    const idx = userList.findIndex((obj) => obj.email === email)

                    if (idx != -1) {
                        // user exists => check password

                        if (userList[idx].password == pass) {
                            // password matched => login

                            const data = {
                                name: userList[idx]?.name || 'Manav',
                                role: userList[idx]?.role,
                                email: email,
                            }
                            dispatch(setAuthData(data))
                            navigate('/dashboard')
                        } else {
                            // password did not matched => alert(Error)
                            alert('Incorrect Password!')
                        }



                    } else {
                        // user does not exist => alert(Error)
                        alert(`No user found with email: ${email}`)
                    }
                } catch (err) {
                    console.log('error parsing the json: ', err)
                }

            } else {
                // user list is not available
                alert(`No user found with email: ${email}`)

            }


        } catch (err) {
            alert('Something went wrong in loading the user data!')
            console.error(err)
        }

    }
    return (
        <Box sx={{ display: "flex", backgroundColor: '#051F3D', flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Card className='testtt' elevation={3} variant='outlined' sx={{ margin: "0.5px", minWidth: '30rem', borderRadius: '1rem', boxShadow: '0 0 50px 10px #7EB4F640' }} >

                <CardContent sx={{ margin: '2rem' }}>
                    {/* <Stack> */}
                    <Typography variant="h4" color="#000"  >Welcome Back!</Typography>
                    <Typography variant="subtitle1" color="#000" marginTop="5px">Sing in to your account.</Typography>
                    <form onSubmit={callLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "40px" }}>
                        <TextField name='email' fullWidth required label={'Email'} type='email' style={{ color: "#000", }}>Enter your mail</TextField>
                        <TextField name='pass' fullWidth required label={'Password'} type='password' sx={{ marginTop: "30px" }}></TextField>
                        <Button sx={{ mt: '2rem' }} variant='contained' type='submit' >Sign in</Button>
                    </form>

                    <Typography variant='body1' align='center' mt='2rem' sx={{
                        cursor: 'pointer'
                    }}
                        onClick={() => navigate('/signup')}
                    >Don't have account? Sign Up</Typography>
                    {/* </Stack> */}
                </CardContent>
            </Card>
        </Box>
    )
}

export default Login