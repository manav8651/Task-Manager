import React, { useRef, useState } from 'react'
import {
  CardContent, Card, Box, Stack, TextField, Typography, Button, Container, Paper
  , FormControl, Select, InputLabel, MenuItem
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../features/authSlice'

const SignUp = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const addDataToLocalStorage = ({ key, payload }) => {
    try {
      let data = window.localStorage.getItem(`${key}`)

      if (data) {

        try {
          data = JSON.parse(data)
          const idx = data.findIndex((obj) => obj.email == payload.email)
          if (idx != -1) {
            alert('User already exists with this email!')
            return 'user_exists'
          } else {
            data.push(payload)
          }
        } catch (err) {
          console.log('error parsing the json: ', err)
        }
      } else {
        data = [payload]
      }
      console.log(data)
      window.localStorage.setItem(`${key}`, JSON.stringify(data))

    } catch (err) {
      alert('Something went wrong in saving the user!')
      console.error(err)
    }
  }

  const callSignUp = (e) => {
    e.preventDefault()
    const email = (e.target.email.value)
    const pass = (e.target.pass.value)
    const pass2 = (e.target.passcnf.value)
    const name = e.target.user_name.value
    const roled = e.target.role.value

    if (pass === pass2) {
      const data = {
        name: name,
        role: parseInt(roled),
        email: email,
        password: pass
      }


      const status = addDataToLocalStorage({ key: 'users_list', payload: data })

      if (status != 'user_exists') {

        dispatch(setAuthData(data))
        alert('Account created successfully!')
        navigate('/dashboard')
      }


    }
    else {
      alert('Passwords did not match, please enter the same password!')
    }



  }
  return (
    <Box sx={{ display: "flex", backgroundColor: '#051F3D', flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Card className='testtt' elevation={3} variant='outlined' sx={{ margin: "0.5px", minWidth: '30rem', borderRadius: '1rem', boxShadow: '0 0 50px 10px #7EB4F640' }} >

        <CardContent sx={{ margin: '2rem', }}>
          {/* <Stack> */}
          <Typography variant="h4" color="#000"  >Welcome Back!</Typography>
          <Typography variant="subtitle1" color="#000" marginTop="5px">Sing in to your account.</Typography>
          <form
            onSubmit={callSignUp}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "40px", gap: '1rem' }}>

            <TextField name='email' fullWidth required label={'Email'} type='email' style={{ color: "#000", }}>Enter your mail</TextField>

            <TextField name='user_name' fullWidth required label={'Name'} type='text' style={{ color: "#000", }}>Enter your mail</TextField>

            <TextField name='pass' fullWidth required label={'Password'} type='password' ></TextField>

            <TextField name='passcnf' fullWidth required label={'Confirm Password'} type='password' ></TextField>
            <TextField name='role' fullWidth required label={'Role'} type='number' ></TextField>
            <Button sx={{ mt: '2rem' }} variant='contained' type='submit' >Sign Up</Button>
          </form>
          <Typography variant='body1' align='center' mt='2rem' sx={{
            cursor: 'pointer'
          }}
            onClick={() => navigate('/')}
          >Back to Login</Typography>
          {/* </Stack> */}
        </CardContent>
      </Card>
    </Box>
  )
}

export default SignUp