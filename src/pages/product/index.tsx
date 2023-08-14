import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { TextField, Button, Typography, MenuItem } from '@mui/material';

import { FiUpload } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import styles from './styles.module.scss';
import { getImageUrl } from '../../Url';
import { Api } from '../../Api';

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps {
    List?: ItemProps[];
}

export function newProduct({ List }: CategoryProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);

    const [categories, setCategories] = useState(List || []);
    const [brand, setBrand] = useState(List || []);
    const [categorySelected, setCategorySelected] = useState<number | null>(null);
    const [brandSelected, setBrandSelected] = useState<number | null>(null);

    const [categoryError, setCategoryError] = useState(false);
    const [brandError, setBrandError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [amountError, setAmountError] = useState(false);


    useEffect(() => {
        async function fetchCategories() {
            const response = await Api.get('/category');
            setCategories(response.data);
        }
        fetchCategories();

        async function fetchBrand() {
            const response = await Api.get('/brand');
            setBrand(response.data);
        }
        fetchBrand();
    }, []);

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

    function handleChangeCategory(event: ChangeEvent<{ value: unknown }>) {
        setCategorySelected(event.target.value as number);
    }

    function handleChangeBrand(event: ChangeEvent<{ value: unknown }>) {
        setBrandSelected(event.target.value as number);
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (!name || !price || !description || !amount || categorySelected === null || brandSelected === null || !imageAvatar) {
            if (!name) setNameError(true);
            if (!price) setPriceError(true);
            if (!description) setDescriptionError(true);
            if (!amount) setAmountError(true);
            if (categorySelected === null) setCategoryError(true);
            if (brandSelected === null) setBrandError(true);

            return;
        }

        try {
            const data = new FormData();
            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('amount', amount);
            data.append('categoryId', categories[categorySelected].id);
            data.append('productbtandId', brand[brandSelected].id);
            data.append('file', imageAvatar);

            await Api.post('/product', data);
            toast.success('Cadastrado com sucesso!');
            
           
        } catch (err) {
            console.log(err);
            toast.error('Ops erro ao cadastrar!');
        }

        setName('');
        setPrice('');
        setDescription('');
        setAmount('');
        setCategorySelected(null);
        setBrandSelected(null);
        setImageAvatar(null);
        setAvatarUrl('');
        setCategoryError(false);
        setBrandError(false);
        setNameError(false);
        setPriceError(false);
        setDescriptionError(false);
        setAmountError(false);

    }

    return (
        <>
           
                <main className={styles.container}>
                    <Typography variant="h4">Novo produto</Typography>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="black" />
                            </span>
                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />
                            {avatarUrl && <img className={styles.preview} src={avatarUrl} alt="Foto do produto" />}
                        </label>

                        <TextField
                            select
                            label="Selecione uma categoria"
                            value={categorySelected}
                            onChange={handleChangeCategory}
                            sx={{ marginBottom: (theme) => theme.spacing(3) }}
                            error={categoryError}
                            helperText={categoryError && 'Categoria é obrigatória'}
                        >
                            {categories.map((item, index) => (
                                <MenuItem key={item.id} value={index}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            label="Selecione um fornecedor"
                            value={brandSelected}
                            onChange={handleChangeBrand}
                            sx={{ marginBottom: (theme) => theme.spacing(3) }}
                            error={brandError}
                            helperText={brandError && 'Fornecedor é obrigatório'}
                        >
                            {brand.map((item, index) => (
                                <MenuItem key={item.id} value={index}>
                                    <img style={{width: '40px', objectFit: 'cover'}} src={getImageUrl(item.name)} alt="" /> 
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            error={nameError}

                            label="Digite o nome do produto"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ marginBottom: (theme) => theme.spacing(3) }}
                            helperText={nameError && 'Nome produto é obrigatório'}
                        />

                        <TextField
                            error={priceError}
                            label="Preço do produto"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            sx={{ marginBottom: (theme) => theme.spacing(3) }}
                            helperText={priceError && 'Preço é obrigatório'}
                        />
                        <TextField
                            error={amountError}
                            label="Quantidade do produto"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            sx={{ marginBottom: (theme) => theme.spacing(3) }}
                            helperText={amountError && 'Quantidade é obrigatório'}
                        />

                        <TextField
                            error={descriptionError}
                            value={description}
                            label="Descreva seu produto..."
                            sx={{ marginBottom: (theme) => theme.spacing(3) }}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={4}
                            helperText={descriptionError && 'Descrição é obrigatório'}

                        />

                        <Button className={styles.buttonAdd} type="submit" variant="contained" color="primary">
                            Cadastrar
                        </Button>

                    </form>

                </main>
                <ToastContainer />
           
        </>
    )
}


