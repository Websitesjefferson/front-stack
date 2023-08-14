import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Card, CardContent, Typography} from '@mui/material';
import { getImageUrl } from '../../Url';


interface ProductPlate {
  id: string;
  name: string;
  price: string;
  amount: string
  description: string;
  banner: string;

}

interface IProps {
  product: ProductPlate;
  handleDelete: (id: string) => {};
  handleEditProduct: (product: ProductPlate) => void;
}

export function Product({
  product,
  handleDelete,
  handleEditProduct,
}: IProps) {





  function setEditingFood(): void {
    handleEditProduct(product);
  }

  const Price = parseFloat(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return (
    <Card sx={{ minWidth: 200, maxWidth: 300, minHeight: 450, maxHeight: '%100', background: '#DCDCDC' }}>

      <div>

        <img src={getImageUrl(product.banner)} alt={product.name} />
      </div>
      <CardContent sx={{color: ' #3d3d4d'}}>
        <h2>{product.name}</h2>
        <p>Und: {product.amount}</p>
        <p >{product.description}</p>
        <strong>
          {Price}
        </strong>
      </CardContent>
      <CardContent>
        <Typography
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '30px',

          }}>
          <div

            onClick={() => setEditingFood()}
            data-testid={`edit-food-${product.id}`}
          >
            <FiEdit3 size={22} />
          </div>
          <div
          onClick={() => {
                            const shouldDelete = window.confirm(
                              'Tem certeza que deseja deletar este produto?'
                            );
                            if (shouldDelete) {
                              handleDelete(product.id);
                            }
                          }}
            
            data-testid={`remove-food-${product.id}`}
          >
            <FiTrash size={22} />
          </div>
        </Typography>

      </CardContent>
    </Card>
  );
};

