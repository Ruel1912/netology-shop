import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { IOrder } from '../../pages/cart/CartPage'
import { STATUS_LOADING } from '../../shared/constants'
import { Error } from '../../shared/Error'
import { Preloader } from '../../shared/Preloader'
import { postOrder, selectCardCompleteOrder, selectCardError, selectCardItems, selectCardStatus, setCart, toogleCompleteOrder } from './cartSlice'

const CartOrder = () => {

  const dispatch = useAppDispatch()
  const completeOrder = useAppSelector(selectCardCompleteOrder)
  const status = useAppSelector(selectCardStatus)
  const items = useAppSelector(selectCardItems)
  const error: string = useAppSelector(selectCardError)

  const orderSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement))

    const orderData = {
      owner: {
        ...formData,
      },
      items: items.map(item => ({
        id: item.id,
        price: item.price,
        count: item.quantity
      }))
    } as IOrder

    dispatch(postOrder(orderData))
    dispatch(toogleCompleteOrder())
    setCart([])
  }

  if (error) return <Error error={error || 'Ошибка сохранения заказа'} />

  return (
    <>
      <section className="order">
        {status === STATUS_LOADING && (<Preloader />)}
        {status !== STATUS_LOADING && (
          <h2 className="text-center">
            {completeOrder ? 'Заказ оформлен. С вами свяжется менеджер для подтверждения заказа' : 'Оформить заказ'}
          </h2>
        )}
        {!completeOrder && (
          <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
            <form onSubmit={orderSubmit} className="card-body">
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input name='phone' className="form-control" id="phone" placeholder="Ваш телефон" />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input name='address' className="form-control" id="address" placeholder="Адрес доставки" />
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="agreement" />
                <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
              </div>
              <button type="submit" className="btn btn-outline-secondary">Оформить</button>
            </form>
          </div>
        )
        }
      </section>
    </>
  )
}

export default CartOrder