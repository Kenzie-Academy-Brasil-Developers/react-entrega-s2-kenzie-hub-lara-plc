import {Redirect} from 'react-router-dom';
import { Page, Container, Header, InfoBar, TechBar } from './style';
import Logo from '../../Logo.png';
import {FiPlus} from 'react-icons/fi';
import {Modal} from "@mui/material";
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import axios from 'axios';
import {toast, ToastContainer}from 'react-toastify'
import Card from '../../components/TechCard'


const Dashboard = ({isLogged, setIsLogged})=>{
  

  if(!isLogged){
    return( <Redirect to='/' />)
}

const logout = () => {
    localStorage.clear()
    setIsLogged(false)
}


const user = JSON.parse(localStorage.getItem('@KenzieHub:user'))
const token = JSON.parse(localStorage.getItem('@KenzieHub:token'))

const url = 'https://kenziehub.herokuapp.com'

    
const formSchema = yup.object().shape({
     title: yup.string().required("Nome obrigatório"),

    status: yup.string(),
});


const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(formSchema),
  });


const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}
 console.log(user)

const onSubmitFunction = (data) => {
          axios
          .post(`${url}/users/techs`, data, config)
          .then((response)=>{
              setOpen(false)
              toast.success('Tecnologia cadastrada com sucesso.')


          })
          .catch((err)=> (console.log(err),
          err.response.data.message === 'User Already have this technology created you can only update it'?
          toast.error('Essa tecnologia já está cadastrada!')
          :
          toast.error('Opss, algo deu errado.')
          ))
        }




const [selected, setSelected] = useState('Iniciante')

const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const techs = user.techs

return(
    <Page>
        <ToastContainer/>
            <Container>
                <Header>
                        <img src={Logo}/>
                        <Button onClick={logout} schemaGrey={true}>Logout</Button>
                </Header>

                <InfoBar>
                    <h2>
                        {`Olá, ${user.name}`}
                    </h2>

                    <h4>
                            {user.course_module}
                    </h4>
                </InfoBar>

                <TechBar>
                    <Header>
                        <h2>Tecnologias</h2>
                        <Button schemaGrey={true} onClick={handleOpen}>
                            <FiPlus size={20}/>
                        </Button>
                    </Header>

                {techs.map( (tech) => 
                <Card tech = {tech} />
                    )}




                </TechBar>

                </Container>


                <Modal        
                open={open}
                onClose={handleClose}>

                    <form onSubmit={handleSubmit(onSubmitFunction)}>
                            <Input     
                            register={register}
                            name='title' 
                            label='Nome'
                            placeholder='Tecnologia'        
                            error={errors.name?.message}
                            />

                            <Select
                            register={register}
                            name='status'
                            label='Selecionar status'
                            value={selected}
                            onChange={(e) => setSelected(e.target.value)}
                            values={[
                            {name:'Iniciante', text:'Iniciante'},
                            {name:'Intermediário', text:'Intermediário'},
                            {name:'Avançado', text:'Avançado'},
                            ]}
                            />

                            <Button type='submit'>Cadastrar Tecnologia</Button>
                        </form>
                </Modal>


        </Page>
   )

    }

    export default Dashboard