import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { priceFormatter } from '../../shared/formatter';
import { removeItem, selectCardItems, selectCartTotal } from './cartSlice'

export function Cart() {
  const cartTableHeaders = ['#', 'Название', 'Размер', 'Кол-во', 'Стоимость', 'Итого', 'Действия'];

  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCardItems)
  const total = useAppSelector(selectCartTotal)

  return (
    <section className="cart">
      <h2 className="text-center">{items.length > 0 ? 'Корзина' : 'Ваша корзина пуста'}</h2>
      {items.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              {cartTableHeaders.map(header => (<th scope="col" key={header}>{header}</th>))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td scope="row">{index + 1}</td>
                <td>
                  <Link to={`/catalog/${item.id}`}>{item.title}</Link>
                </td>
                <td>{item.size}</td>
                <td>{item.quantity}</td>
                <td>{priceFormatter(item.price)}</td>
                <td>{item.quantity * item.price}</td>
                <td><button
                  onClick={() => dispatch(removeItem(item))}
                  className="btn btn-outline-danger btn-sm">Удалить</button></td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} className="text-right">Общая стоимость</td>
              <td>{priceFormatter(total)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </section>
  )
}
