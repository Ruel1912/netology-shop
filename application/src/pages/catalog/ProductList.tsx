import { IProduct } from '../../features/catalog/catalogSlice';
import { ProductCard } from '../../features/product/ProductCard';

interface Props {
  products: IProduct[];
}

export const ProductsList = ({ products }: Props) => {

  if (!products) return null;

  return (
    <div className="row">
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  )
}