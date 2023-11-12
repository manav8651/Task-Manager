import React from 'react'
import { Box, Typography } from '@mui/material'
import { setAuthData } from '../features/authSlice'
import { useDispatch } from 'react-redux'

const Navbar = ({ user_name, user_role }) => {

  const dispatch = useDispatch()

  const getRoleString = (role) => {
    switch (role) {
      case 1:
        return 'Admin'
      case 2:
        return 'Controller'
      case 3:
        return 'Head Coach'
      case 4:
        return 'Coach'
    }
  }
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mx: '4rem',
      py: '2rem',
    }}>

      <Typography
        sx={{
          cursor: 'pointer'
        }}
        // log out on clik of the logo
        onClick={() => dispatch(setAuthData(null))}
        variant='h4' color={'white'}  >YOUR LOGO</Typography>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>

        <Typography variant='body1' color={'white'}>{user_name}</Typography>
        <Typography variant='body2' color={'white'} sx={{
          backgroundColor: '#2D527F',
          borderRadius: '2rem',
          padding: '0.25rem 0.5rem'
        }}>{getRoleString(user_role)}</Typography>
      </Box>

    </Box>
  )
}

export default Navbar