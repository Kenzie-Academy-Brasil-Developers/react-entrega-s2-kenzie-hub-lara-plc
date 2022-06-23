import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Redirect, useHistory} from 'react-router-dom'
import axios from 'axios';
import toast from 'toastify'
import {Container} from '@mui/material'



const Login = ( {isLogged, setIsLogged})=>{

    const url = 'https://kenziehub.herokuapp.com'

    
    const formSchema = yup.object().shape({
         email: yup.string().email('Digite um email válido').required("Email obrigatório"),

        password: yup.string().required("Senha obrigatória"),
    });


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
      });


      const history = useHistory()



      const toSignUp = () => {
        history.push('/signup')
      }


      const onSubmitFunction = (data) => {
        axios
        .post(`${url}/sessions`, data)
        .then((response)=>{
            console.log(response.data.token)
            console.log(response.data.user.id)
            const token = response.data.token;
            const userId = response.data.user.id;

            
            localStorage.setItem('@KenzieHub:token', JSON.stringify(token));
            localStorage.setItem('@KenzieHub:userId', JSON.stringify(userId));

            setIsLogged(true)

            return history.push('/dashboard')
        })
        .catch((error)=> (toast.error('Email ou senha inválidos'), console.log(error)))
      }

if(isLogged){
    return( <Redirect to='/dashboard' />)
}


return(
        <Container>
                <Typography> Login</Typography>

                <form
                onSubmit={handleSubmit(onSubmitFunction)}
                >

                    <TextField
                    sx={{mt:'5%', width: 250}}
                    error={errors?.email}
                    helperText={errors?.email?.message}
                    label="Email"
                    className='Input'
                    {...register("email")}
                    />

                    <TextField
                    sx={{mt:'5%', width: 250}}
                    error={errors?.password}
                    helperText={errors?.password?.message}
                    label="Senha"
                    className='Input'
                    {...register("password")}
                    />



                    <Button sx={{width: 100, height: 30}} variant="contained" type="submit">Entrar</Button>
                </form>

                <Typography> Ainda não tem uma conta?</Typography>
                <Button sx={{width: 100, height: 30}} variant="contianed" onClick={toSignUp}>Cadastre-se</Button>


        </Container>
      );
    }

    export default Login