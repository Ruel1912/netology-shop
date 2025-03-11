import { useAppSelector } from '../../app/hooks';
import { Cart } from '../../features/cart/Cart';
import CartOrder from '../../features/cart/CartOrder';
import { selectCardCompleteOrder, selectCardItems } from '../../features/cart/cartSlice';

export const CartPage = () => {

  const items = useAppSelector(selectCardItems)
  const completeOrder = useAppSelector(selectCardCompleteOrder)

  return (
    <>
      {!completeOrder && (<Cart />)}
      {items.length > 0 && <CartOrder />}
    </>
  )
}