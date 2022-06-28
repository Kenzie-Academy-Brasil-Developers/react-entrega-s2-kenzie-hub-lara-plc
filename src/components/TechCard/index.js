import {InputContainer, Container} from './style'
import Button from '../Button';
import {FiTrash2} from 'react-icons/fi';
import {Modal} from "@mui/material";
import Input from '../../components/Input';
import Select from '../../components/Select';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import axios from 'axios';
import {toast, ToastContainer}from 'react-toastify'

const Card = ({ tech,  ...rest}) => {


const user = JSON.parse(localStorage.getItem('@KenzieHub:user'))
const token = JSON.parse(localStorage.getItem('@KenzieHub:token'))

const url = 'https://kenziehub.herokuapp.com'


const [selected, setSelected] = useState('Iniciante')

const [openMod, setOpenMod] = useState(false);
const handleOpen = () => setOpenMod(true);
const handleClose = () => setOpenMod(false);


    
const formSchema = yup.object().shape({
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

const deleteTech = ()=> {
    axios
    .delete(`${url}/users/techs/${tech.id}`, config)
    .then((response)=>{
        toast.success('Tecnologia deletada')


    })
    .catch((err)=> (console.log(err),
    toast.error('Opss, algo deu errado.')
    ))
  }



const onSubmitFunction = (data) => {
          axios
          .put(`${url}/users/techs/${tech.id}`, data, config)
          .then((response)=>{
              setOpenMod(false)
              toast.success('Status alterado com sucesso')


          })
          .catch((err)=> (console.log(err),
          toast.error('Opss, algo deu errado.')
          ))
        }


return(
    <Container key={tech.id} >
        <div onClick={handleOpen}>
                <h3>{tech.title}</h3> 
                <h4> {tech.status}</h4>
        </div>
    <Button onClick={() =>deleteTech}><FiTrash2 /></Button>


    <Modal        
                open={openMod}
                onClose={handleClose}>

                    <form onSubmit={handleSubmit(onSubmitFunction)}>
                            <Input     
                            register={register}
                            name='name'
                            label='Nome'
                            placeholder={tech.title}        
                            disabled
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

                            <Button type='submit'>Alterar Tecnologia</Button>
                        </form>
                </Modal>


    </Container>
)
}

export default Card;