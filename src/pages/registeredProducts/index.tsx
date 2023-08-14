import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import { Button, Card, CircularProgress, Typography, Box } from '@mui/material';
import { animated } from 'react-spring';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

import styles from './styles.module.scss';
import { Product } from '../../components/products';
import { EditCategoryModal  } from '../../components/modalCategory';
import { EditProductModal } from '../../components/modalProduct'
import { getImageUrl } from '../../Url';
import { Api } from '../../Api';



type ProductProps = {
  id: string;
  price: string;
  name: string;
  description: string
  amount: string
  banner: string
}
type CategoryProps = {
  id: string;
  name: string;

}



export function registeredProducts() {
  const [openState, setOpenState] = useState<number | null>(null);
  const [openStateSupplier, setOpenStateSupplier] = useState<number | null>(null);


  const handleButtonClick = (index: number) => {
    setOpenState((prevOpenState) => (prevOpenState === index ? null : index));
  };

  const handleButtonBrand = (index: number) => {
    setOpenStateSupplier((prevOpenState) => (prevOpenState === index ? null : index));
  };

  useEffect(() => {
    const handleCloseCurtains= (e: MouseEvent) => {
      if (!e.target) return;
      const clickedElement = e.target as HTMLElement;
      if (!clickedElement.closest('.card-container')) {
        setOpenState(null);
        setOpenStateSupplier(null);
      }
    };
    

    window.addEventListener('click', handleCloseCurtains);
   
    return () => {
      window.removeEventListener('click', handleCloseCurtains);
    };
   
  }, []);
 

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [brand, setBrand] = useState<CategoryProps[]>([])
  const [banner, setBanner] = useState('');
 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditModalOpenProduct, setIsEditModalOpenProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
useEffect(() => {

    async function Products() {
      setLoading(true)
      const response = await Api.get('/category/product')

      setProducts(response.data);
      setLoading(false)
    }
    Products()
    SearchCategory()
    SearchBrand()


  }, [])
  async function SearchCategory() {
    const response = await Api.get('/category')
    setCategories(response.data)

  }
  async function SearchBrand() {
    const response = await Api.get('/brand')
    setBrand(response.data)

  }
  

  const openEditModal = (category: CategoryProps) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };
  const openEditModalProduct = (product: ProductProps) => {
    setSelectedProduct(product);
    setIsEditModalOpenProduct(true);
    
  };

  const closeEditModal = () => {
    setSelectedCategory(null);
    setSelectedProduct(null)
    setIsEditModalOpen(false);
    setIsEditModalOpenProduct(false)
  };
 async function searchProducts(id: string) {
    setLoading(true)
    const response = await Api.get('/category/product', {
      params: {
        categoryId: id,


      }

    })

    setProducts(response.data);
    setLoading(false)
  }

  async function searchProductsBrand(id: string) {
    setLoading(true)
    const response = await Api.get('/category/product', {
      params: {
        productbtandId: id,}

    })

    setProducts(response.data);
    setLoading(false)
  }
  async function deleteProduct(id: string) {
    try {
      await Api.delete('/product/delete', {
        params: {
          id: id
        }
      })
      setProducts(products.filter(product => product.id !== id));
      return toast.success('Deletado com sucesso!')
    } catch (err) {
      toast.error("Conclua todas as ordens para apagar um Produto!")

    }
  }
  async function deleteCategory(id: string) {
    try {
      await Api.delete('/category/delete', {
        params: {
          item_id: id
        }
      })
      setCategories(categories.filter(product => product.id !== id));
     
      return toast.success('Deletado com sucesso!')
    } catch (err) {
      toast.error("Conclua todas as ordens para apagar um Produto!")

    }
  }
  async function deleteBrand(id: string) {
    try {
      await Api.delete('/brand/delete', {
        params: {
          item_id: id
        }
      })
      setBrand(brand.filter(product => product.id !== id));
     
      return toast.success('Deletado com sucesso!')
    } catch (err) {
     

    }
  }

 

  async function handleSave(updatedCategory: CategoryProps) {
    try {
      await Api.put('/category/update', {
        id: updatedCategory.id,
        name: updatedCategory.name // Usar o nome da categoria atualizada
        
      });
 
      SearchCategory();
      toast.success('Atualizado com sucesso!');
    } catch (error) {
      // Lidar com erros, se necessário 
      
      console.error('Erro ao atualizar categoria:', error);
      toast.error('Erro ao atualizar categoria');
    }
  }

  async function handleSaveProduct(updatedProduct: ProductProps) {
    try {
    const data = new FormData();
    data.append('id', updatedProduct.id);
     data.append('name', updatedProduct.name);
     data.append('price', updatedProduct.price);
     data.append('description', updatedProduct.description);
     data.append('amount', updatedProduct.amount);
     if (banner) {
      data.append('file', banner);
    }

      await Api.put('/product/update',data)

      
      // Após a atualização bem-sucedida, recarregue a lista de produtos atualizada
    const response = await Api.get('/category/product');
    const updatedProductList = response.data; // Supondo que sua API retorne a lista de produtos

    // Atualize o estado da lista de produtos
    setProducts(updatedProductList);
      
      toast.success('Atualizado com sucesso!');
    } catch (error) {
      // Lidar com erros, se necessário 
      
      console.error('Erro ao atualizar categoria:', error);
      toast.error('Erro ao atualizar categoria');
    }
  }
  
 return (
    <>

      <div className={styles.Div}>
        <div className={styles.Container} >
          <div className={styles.Card} >


            {
              categories.length === 0 && (
                <span className={styles.text}>
                  Nenhuma categoria cadastrada!!
                </span>
              )}

            {categories &&
              categories.map((item, index) => {
                return (

                  <Card
                    className="card-container"
                    sx={{
                      background: '#DCDCDC',
                      marginTop: 10,
                      minWidth: 100,
                      maxWidth: 150,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    key={item.id}
                  >
                    <Typography
                      component={animated.div}
                      onClick={() => handleButtonClick(index)}
                      sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        sx={{
                          fontSize: '15px',
                          paddingBlock: 2,
                          paddingInline: 5,
                          color: ' #3d3d4d',
                          fontWeight: 700
                        }}
                        onClick={() => searchProducts(item.id)}
                      >
                        {item.name}
                      </Button>

                      < animated.div style={{

                        overflow: 'hidden',
                        maxHeight: openState === index ? '100px' : '0',
                        transition: 'max-height 300ms ease-out',


                      }}>
                        <Box  sx={{ display: 'flex', gap: 4 }}>
                          <Box onClick={() => openEditModal(item)}>
                            <AiOutlineEdit color={'#3d3d4d'} size={22} />
                          </Box>
                          <Box onClick={() => {
                            const shouldDelete = window.confirm(
                              'Tem certeza que deseja deletar esta categoria?'
                            );
                            if (shouldDelete) {
                              deleteCategory(item.id);
                            }
                          }}>
                            <AiOutlineDelete color={'#3d3d4d'} size={22} />
                          </Box>

                        </Box>
                      </animated.div>

                    </Typography>
                  </Card>

                )

              })
            }
          </div>
        </div>

        <div className={styles.Container} >
          <div className={styles.Card} >


            {
              brand.length === 0 && (
                <span className={styles.text}>
                  Nenhum fornecedor cadastrado!
                </span>
              )}

            {brand &&
              brand.map((item, index) => {
                return (

                  <Card
                    className="card-container"
                    sx={{
                      background: '#DCDCDC',
                      marginTop: 2,
                      minWidth: 100,
                      maxWidth: 150,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    key={item.id}
                  >
                    <Typography
                      component={animated.div}
                      onClick={() => handleButtonBrand(index)}
                      sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: '15px',
                          paddingBlock: 2,
                          paddingInline: 5,
                          color: ' #3d3d4d',
                          fontWeight: 700
                        }}
                        onClick={() => searchProductsBrand(item.id)}
                      >
                          <img src={getImageUrl(item.name)} alt="" />  
                      </Box>

                      < animated.div style={{

                        overflow: 'hidden',
                        maxHeight: openStateSupplier === index ? '100px' : '0',
                        transition: 'max-height 300ms ease-out',


                      }}>
                        <Box  sx={{ display: 'flex', gap: 4 }}>
                         
                          <Box onClick={() => {
                            const shouldDelete = window.confirm(
                              'Tem certeza que deseja deletar esta categoria?'
                            );
                            if (shouldDelete) {
                              deleteBrand(item.id);
                            }
                          }}>
                            <AiOutlineDelete color={'#3d3d4d'} size={22} />
                          </Box>

                        </Box>
                      </animated.div>

                    </Typography>
                  </Card>

                )

              })
            }
          </div>
        </div>


        <div className={styles.FoodsContainer} >
          <div className={styles.CardProduct} >
            {
              loading ? <CircularProgress style={{ marginTop: 50 }} />
                :
                products.map(product => (
                  <Product
                    key={product.id}
                    product={product}
                    handleDelete={deleteProduct}
                    handleEditProduct={openEditModalProduct}
                  />
                ))
            }
          </div>
        </div>

        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          category={selectedCategory}
          onSave={handleSave} // Implemente a função para atualizar a categoria
        />

        <EditProductModal
        isOpen={isEditModalOpenProduct}
        onClose={closeEditModal}
        product={selectedProduct}
        onSave={handleSaveProduct} 
        setBanner={setBanner}
        />






        {/* {categoryVisible && (


          <ModalCategory

            isOpen={categoryVisible}
            onRequestClose={handleCategoryCloseModal}
            handleFinishOrder={handleFinishEditCategory}
            categories={editingCategory}
            category={category}
            setCategory={setCategory}



          />

        )}


        {modalVisible && (


          <ModalProduct

            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            handleFinishOrder={handleFinishEditProduct}
            product={editingProduct}
            name={name}
            banner={banner}
            setBanner={setBanner}
            description={description}
            price={price}
            setName={setName}
            setPrice={setPrice}
            setDescription={setDescription}

          />

        )}

        {
           categoryVisibleDelete && (

            <ModalDeleteCategory 
            isOpen={categoryVisibleDelete}
            onRequestClose={handleCategoryCloseModalDelete}
            categories={editingCategory}
            handleFinishCategory={deleteCategory}/>
           )
        } */}
        <ToastContainer/>
      </div>



    </>
  )
}
