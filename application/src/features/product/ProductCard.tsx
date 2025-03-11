import { Link } from 'react-router-dom';

import './product.css';
import { IProduct } from '../../pages/catalog/ProductList';
import { priceFormatter } from '../../shared/formatter';

interface Props {
  product: IProduct
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="col-4 catalog-item-card" key={product.id}>
      <div className="card h-100 ">
        <img src={product.images[0]}
          className="card-img-top img-fluid" alt={product.title} />
        <div className="card-body">
          <p className="card-text">{product.title}</p>
          <p className="card-text">{priceFormatter(product.price)}</p>
          <Link to={`/catalog/${product.id}`} className="btn btn-outline-primary">Заказать</Link>
        </div>
      </div>
    </div>
  )
}