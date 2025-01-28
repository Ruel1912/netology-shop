import { IOrder } from '../../pages/cart/CartPage'
import { API_BASE_URL } from '../../shared/config/apiConfig'

export async function setOrder(order: IOrder) {
  try {
    const response = await fetch(`${API_BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}
