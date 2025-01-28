import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchProduct } from '../../features/product/productSlice'
import { Preloader } from '../../shared/Preloader'
import { Error } from '../../shared/Error'
import { IProduct } from '../catalog/ProductList'
import { STATUS_FAILED, STATUS_SUCCEEDED } from '../../shared/constants'
import { addItem } from '../../features/cart/cartSlice'
import { ICart } from '../../features/cart/Cart'
import { priceFormatter } from '../../shared/formatter/priceformatter'

export const ProductPage = () => {

  const [productQuantity, setProductQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  const dispatch = useAppDispatch()
  const { product, status, error } = useAppSelector(state => state.product)
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    const productId = Number(id);
    dispatch(fetchProduct(productId))
  }, [id, dispatch]);

  if (status === STATUS_FAILED) return <Error error={error || 'Не удалось загрузить информацию о товарах, попробуйте ещё раз'} />
  if (status !== STATUS_SUCCEEDED) return <Preloader />

  const productData = product as IProduct

  if (!productData) {
    return null;
  }

  const hasAvailableSizes = productData.sizes.some(size => size.available);

  const addToCart = (item: IProduct) => {

    const cartData: ICart = {
      id: item.id,
      title: item.title,
      size: selectedSize,
      quantity: productQuantity,
      price: item.price,
    }

    dispatch(addItem(cartData))
    navigator('/cart')
  }

  return (
    <section className="catalog-item">
      <h2 className="text-center">{productData.title || ''}</h2>
      <div className="row">

        <div className="col-5">
          <img src={productData?.images[0] || ''}
            className="img-fluid" alt={productData?.title || ''} />
        </div>

        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{productData.sku ?? ''}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{productData.manufacturer ?? ''}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{productData.color ?? ''}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{productData.material ?? ''}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{productData.season ?? ''}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{productData.reason ?? ''}</td>
              </tr>
              <tr>
                <td>Цена</td>
                <td>{priceFormatter(productData.price)}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-center">
            {hasAvailableSizes ? (
              <p>Размеры в наличии:{' '}
                {productData.sizes.filter(size => size.available).map(({ size }) => (
                  <span
                    key={size}
                    className={`catalog-item-size ${selectedSize === size ? 'selected' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedSize(size)}
                  >{size}
                  </span>
                ))}
              </p>
            ) : (<p>Нет в наличии</p>)}
          </div>

          {hasAvailableSizes && (
            <>

              <div className="text-center">

                <p>Количество: <span className="btn-group btn-group-sm pl-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => productQuantity > 1 && setProductQuantity(productQuantity - 1)}
                  >-</button>
                  <span className="btn btn-outline-primary">{productQuantity}</span>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setProductQuantity(productQuantity + 1)}
                  >+</button>
                </span>
                </p>
              </div>

              <button
                disabled={!selectedSize || !productQuantity}
                className="btn btn-danger btn-block btn-lg"
                onClick={() => addToCart(productData)}
              >В корзину
              </button>
            </>
          )}

        </div>
      </div>
    </section >
  )
}