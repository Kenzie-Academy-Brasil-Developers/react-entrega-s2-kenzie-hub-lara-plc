import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {Redirect} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import toast from 'toastify'
import {Container} from '@mui/material'




const SignUp = ({isLogged})=>{

  if(isLogged){
    return( <Redirect to='/dashboard' />)
}


return(
        <Container>
                <Typography> SignUp</Typography>


        </Container>
      );
    }

    export default SignUp