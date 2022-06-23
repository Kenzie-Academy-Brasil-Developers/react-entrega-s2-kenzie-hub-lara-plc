import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Redirect, useHistory} from 'react-router-dom'
import axios from 'axios';
import toast from 'toastify'
import {Container, Select, MenuItem, InputLabel, FormControl} from '@mui/material'
import { useState } from 'react';



const SignUp = ( {isLogged})=>{

    const url = 'https://kenziehub.herokuapp.com'

    
    const formSchema = yup.object().shape({
      email: yup.string().email('Digite um email válido').required("Email obrigatório"),

      password: yup.string().min(8,'A senha deve conter pelo menos 8 caracteres, sendo uma letra maúscula, um número e um caractere especial')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,'A senha deve conter pelo menos 8 caracteres, sendo uma letra maúscula, um número e um caractere especial')
      .required("Senha obrigatória"),

      name: yup.string().max(18,'O nome deve ter no máximo 18 caracteres')
      .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,'O nome não pode conter caracteres especiais')
      .required("Nome obrigatório"),

      bio: yup.string().max(180, 'Máximo 180 caracteres'),

      contact: yup.string().required("Campo obrigatório"),

      course_module:yup.string()

  });


  const [selected, setSelected] = useState('Primeiro módulo (Introdução ao Frontend)')

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
      });


      const history = useHistory()


      const onSubmitFunction = (data) => {
        axios
        .post(`${url}/users`, data)
        .then((response)=>{
            console.log(response)
            reset({email:'', password:'', name:'', bio:'', contact:''})
            toast.success('Usuário criado com sucesso')

        })
        .catch((error)=> 
        error.response.data.message === 'Email already exists'?
        (toast.error('Esse email já está cadastrado!'), console.log(error))
        :
        (toast.error('Opss, algo deu errado'), console.log(error)))
      }

if(isLogged){
    return( <Redirect to='/dashboard' />)
}


return(
        <Container>
          
               <Typography> Cadastro</Typography>
               <Button sx={{width: 100, height: 30}} variant="contianed" onClick={()=> history.push('/')}>Login</Button>

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
              label="Password"
              className='Input'
              type="password"
              {...register("password")}
            />

            <TextField
               sx={{mt:'5%', width: 250}}
              error={errors?.name}
              helperText={errors?.name?.message}
              label="Name"
              className='Input'
              {...register("name")}
            />


            <TextField
              multiline
              maxRows={3}
              sx={{mt:'5%', width: 250}}
              error={errors?.bio}
              helperText={errors?.bio?.message}
              label="Bio"
              className='Input'
              {...register("bio")}
            />

            
            <TextField
              sx={{mt:'5%', width: 250}}
              error={errors?.contact}
              helperText={errors?.contact?.message}
              label="Contato"
              className='Input'
              {...register("contact")}
            />

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="select-label" sx={{ mt: 1.5, minWidth: 120 }}>Módulo</InputLabel>
                <Select 
                labelId='select-label'
                sx={{mt:'5%', width: 250}}
                label="Módulo"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                {...register("course_module")}
                >
                  <MenuItem value='Primeiro módulo (Introdução ao Frontend)'>Primeiro módulo</MenuItem>
                  <MenuItem value='Segundo módulo (Frontend Avançado)'>Segundo módulo</MenuItem>
                  <MenuItem value='Terceiro módulo (Introdução ao Backend)'>Terceiro módulo</MenuItem>
                  <MenuItem value='Quarto módulo (Backend Avançado)'>Quarto módulo</MenuItem>
                </Select>
            </FormControl>




                    <Button sx={{width: 100, height: 30}} variant="contained" type="submit">Enviar</Button>
                </form>



        </Container>
      );
    }

    export default SignUp