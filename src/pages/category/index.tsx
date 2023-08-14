import { useState, ChangeEvent, FormEvent } from 'react';
import { Typography, TextField, Button,  } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './styles.module.scss';
import { Api } from '../../Api';

export function Category() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryErro, setCategoryErro] = useState(false)
 


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Api.post('/category', {
        name: categoryName
    })
    .then((response) => {
        console.log(response.data);
        // tratamento da resposta do servidor
         toast.success('Categoria cadastrada com sucesso!');
        
        
      })
      .catch((error) => {
        console.error('Erro ao enviar a categoria:', error);
        // Faça o tratamento do erro, se necessário
      });


      if(!categoryName){
        setCategoryErro(true)
        return
      }

      setCategoryName('')
    
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };


  return (
    <>
    <div className={styles.Container}>
      <Typography variant="h2">Cadastrar categoria</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome da categoria"
          value={categoryName}
          onChange={handleChange}
          fullWidth
          error={categoryErro}
          helperText={categoryErro && 'Campo vazio. Digite alguma coisa para cadastrar.'}
          
        />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </form>

    
      <ToastContainer />

    </div>

   
    </>
  );
}
