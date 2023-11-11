import React from 'react'
import { Box, Typography } from '@mui/material'

const Navbar = () => {
  return (
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mx: '4rem',
        py: '2rem',
    }}>

        <Typography variant='h4' color={'white'}>YOUR LOGO</Typography>

        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        }}>

        <Typography variant='body1' color={'white'}>Manav Raj</Typography>
        <Typography variant='body2' color={'white'} sx={{
            backgroundColor: '#2D527F',
            borderRadius: '2rem',
            padding: '0.25rem 0.5rem'
        }}>Admin</Typography>
        </Box>

    </Box>
  )
}

export default Navbar