import { useState, ChangeEvent, FormEvent } from 'react';
import { Typography, TextField, Button,  } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './styles.module.scss';
import { Api } from '../../Api';
import { FiUpload } from 'react-icons/fi';

export function ProductBrand() {
  
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);
  const [brandError, setBrandError] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

    const handleBrandSubmit = (event: FormEvent) => {
      event.preventDefault();
      const data = new FormData()
      if (imageAvatar) {
        data.append('file', imageAvatar);
      }
    
    Api.post('/brand', data)
    .then((response) => {
        console.log(response.data);
        // tratamento da resposta do servidor
         toast.success('Marca do produto cadastrada com sucesso!');
        
      setImageAvatar(null)
      setAvatarUrl('')
        
      })
      .catch((error) => {
        console.error('Erro ao enviar a categoria:', error);
        // Faça o tratamento do erro, se necessário
      });

      if(!imageAvatar){
          setBrandError(true)
          return
      }
     
  };
 
  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
        return;
    }

    const image = e.target.files[0];

    if (!image) {
        return;
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
}


  return (
    <>
    

    <div className={styles.Container}>
      <Typography variant="h2">Cadastrar fornecedor</Typography>
      <form onSubmit={handleBrandSubmit}>
      <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="black" />
                            </span>
                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />
                            {avatarUrl && 
                            <img className={styles.preview} src={avatarUrl} alt="Foto do produto" />}
                        </label>
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </form>

    
      <ToastContainer />

    </div>
    </>
  );
}
