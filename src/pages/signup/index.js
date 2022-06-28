import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../components/Button';
import Input from '../../components/Input'
import {Redirect, useHistory} from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import Logo from '../../Logo.png'
import {Page, Header, Container} from './style'
import Select from '../../components/Select';



const SignUp = ( {isLogged})=>{

    const url = 'https://kenziehub.herokuapp.com'

    
    const formSchema = yup.object().shape({
      email: yup.string().email('Digite um email válido').required("Email obrigatório"),

      password: yup.string().min(8,'A senha deve conter pelo menos 8 caracteres, sendo uma letra maúscula, um número e um caractere especial')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,'A senha deve conter pelo menos 8 caracteres, sendo uma letra maúscula, um número e um caractere especial')
      .required("Senha obrigatória"),

      password2: yup.string().oneOf([yup.ref('password'), null], "As senhas devem ser iguais"),


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
        .catch((err)=> 
        err.response.data.message === 'Email already exists'?
        (toast.error('Esse email já está cadastrado!'), console.log(err))
        :
        (toast.error('Opss, algo deu errado'), console.log(err)))
      }

if(isLogged){
    return( <Redirect to='/dashboard' />)
}


return(
  <Page>
        <Header>
            <img src={Logo}/>
            <Button onClick={()=> history.push('/')} schemaGrey={true}>Login</Button>
        </Header>

      <Container>
          
               <h1> Crie sua conta</h1>
               <h4>Rápido e grátis, vamos nessa</h4>

            <form
            onSubmit={handleSubmit(onSubmitFunction)}
            >


            <Input
                register={register}
                name='email'
                placeholder='Seu email'
                label='Email'
                error={errors.email?.message}
            />


            <Input
              register={register}
              name='password'
              placeholder='Sua sennha'
             label='Senha'
              type="password"
              error={errors.password?.message}
            />


            <Input
              register={register}
              name='password2'
              placeholder='Confirmação da senha'
             label='Confirmar Senha'
              type="password"
              error={errors.password2?.message}
            />


            <Input
              register={register}
              name='name'
              placeholder='Seu nome'
              label='Nome'
              error={errors.name?.message}
            />


            <Input
              register={register}
              name='bio'
              placeholder='Fale um pouco de você'
              label='Bio'
              error={errors.bio?.message}
            />


            <Input
              register={register}
              name='contact'
              placeholder='Telefone, rede social...'
              label='Contato'
              error={errors.contact?.message}
            />



                <Select
                register={register}
                name='course_module'
                placeholder='Seu módulo atual'
                label='Módulo'
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                values={[
                  {name:'Primeiro módulo (Introdução ao Frontend)', text:'Primeiro módulo'},
                  {name:'Segundo módulo (Frontend Avançado)', text:'Segundo módulo'},
                  {name:'Terceiro módulo (Introdução ao Backend)', text:'Terceiro módulo'},
                  {name:'Quarto módulo (Backend Avançado)', text:'Quarto módulo'},
              ]}
                />


                  <Button type="submit">Enviar</Button>

                </form>


                </Container>
        </Page>
      );
    }

    export default SignUp