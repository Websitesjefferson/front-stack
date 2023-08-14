// EditCategoryModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, TextField, Typography, Box } from '@mui/material';

type CategoryProps = {
  id: string;
  name: string;
};

type EditCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category: CategoryProps | null;
  onSave: (updatedCategory: CategoryProps) => void;
};

export function EditCategoryModal({
  isOpen,
  onClose,
  category,
  onSave,
}: EditCategoryModalProps) {
  const [editedCategory, setEditedCategory] = useState<CategoryProps | null>(null);

  useEffect(() => {
    setEditedCategory(category);
  }, [category]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedCategory((prevCategory) => ({
      ...(prevCategory || {}),
      id: prevCategory ? prevCategory.id : '', // Mantém o id da categoria ou define como string vazia
      name: name === 'name' ? value : (prevCategory ? prevCategory.name : ''),
    }));
  };
  
  

  const handleSave = () => {
    if (editedCategory) {
      onSave(editedCategory);
      onClose();
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
        marginTop: '200px',
        maxWidth: '300px',
        borderRadius: '4px'}}>
        <h2 id="modal-title">Editar Categoria</h2>
        {editedCategory && (
          <>
            <TextField
              name="name"
              value={editedCategory.name}
              onChange={handleInputChange}
            />
            {/* Outros campos de edição aqui */}
            <Button onClick={handleSave}>Salvar</Button>
          </>
        )}
      </Box>
    </Modal>
  );
}
