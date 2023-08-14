// EditCategoryModal.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Button, TextField, Box } from '@mui/material';
import { FiUpload } from 'react-icons/fi';
import styles from './styles.module.scss';
import { getImageUrl } from '../../Url';



type ProductProps = {
  id: string;
  price: string;
  name: string;
  description: string;
  amount: string;
  banner: string;
};

type EditProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: ProductProps | null;
  onSave: (updatedCategory: ProductProps) => void;
  setBanner: any
};

export function EditProductModal({
  isOpen,
  onClose,
  product,
  onSave,
  setBanner
}: EditProductModalProps) {
  const [editedProduct, setEditedProduct] = useState<ProductProps | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  useEffect(() => {
    setEditedProduct(product);
  }, [product]);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditedProduct((prevCategory) => ({
      ...(prevCategory || {}),
      id: prevCategory ? prevCategory.id : '',
      name: name === 'name' ? value : (prevCategory ? prevCategory.name : ''),
      price: name === 'price' ? value : (prevCategory ? prevCategory.price : ''),
      description: name === 'description' ? value : (prevCategory ? prevCategory.description : ''),
      amount: name === 'amount' ? value : (prevCategory ? prevCategory.amount : ''),
      banner: name === 'banner' ? value : (prevCategory ? prevCategory.banner : ''),
    }));
  };





  const handleSave = () => {
    if (editedProduct) {
      onSave(editedProduct);
      onClose();
    }
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
    

      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    
      setBanner(image)
      console.log(image)

    }
  };




  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={{
        background: '#DCDCDC',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        alignItems: 'center',
        marginTop: '30px',
        maxWidth: '300px',
        
      }}>
        <h2 id="modal-title">Editar Produto</h2>
        {editedProduct && (
          <>

            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={20} color="black" />
              </span>
              <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />
              {selectedImage ? ( 
                <img src={selectedImage}  alt="Imagem selecionada" />
                ) : (
                   <img src={getImageUrl(editedProduct.banner)} alt="Imagem selecionada" />
                )}
            </label>

            <input
             className={styles.Input}
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
             
            />
            <input
            className={styles.Input}
              name="amount"
              value={editedProduct.amount}
              onChange={handleInputChange}
              
            />
            <textarea
              className={styles.textarea}
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
            />
            <input
             className={styles.Input}
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              
            />
            {/* Outros campos de edição aqui */}
            <Button  sx={{marginBottom: 2, fontWeight: 600,  color: ' #3d3d4d'}} onClick={handleSave}>Salvar</Button>
          </>
        )}
      </Box>
    </Modal>
  );
}


