import { ProductCard } from '../../features/product/ProductCard';

interface Props {
  products: IProduct[];
}

export interface IProduct {
  id: number;
  category: number;
  title: string;
  images: string[];
  price: number;
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  sizes: IProductSize[];
  count?: number;
}

interface IProductSize {
  size: string;
  available: boolean;
}

export const ProductsList = ({ products }: Props) => {

  if (!products) return null;

  return (
    <div className="row">
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  )
}