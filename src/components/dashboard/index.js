import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import {Redirect} from 'react-router-dom'
import axios from 'axios';
import toast from 'toastify'
import {Container} from '@mui/material'




const Dashboard = ({isLogged, setIsLogged})=>{

  if(!isLogged){
    return( <Redirect to='/' />)
}

const logout = () => {
    localStorage.clear()
    setIsLogged(false)
}


return(
        <Container>
                <Typography> Dashboard</Typography>

                <Button sx={{width: 100, height: 30}} variant="contianed" onClick={logout}>Logout</Button>
        </Container>
      );
    }

    export default Dashboard