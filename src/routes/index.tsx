import { Route, Routes } from 'react-router-dom';
import { Category } from '../pages/category';
import { newProduct} from '../pages/product'
import { ProductBrand } from '../pages/Productbrand'
import {registeredProducts} from '../pages/registeredProducts'


export function Router() {
  return (
    <Routes>
      <Route path="/" Component={Category} />
      <Route path='/product' Component={newProduct}/>
      <Route path='/brand' Component={ProductBrand} />
      <Route path='/registered' Component={registeredProducts} />
    </Routes>
  );
}
