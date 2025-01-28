import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ProductsList } from '../../pages/catalog/ProductList'
import { fetchTopSales } from './topSalesSlice'
import { Error } from '../../shared/Error'
import { Preloader } from '../../shared/Preloader'
import { STATUS_FAILED, STATUS_LOADING } from '../../shared/constants'

export const TopSales = () => {

  const dispatch = useAppDispatch()
  const { topSales, status, error } = useAppSelector(state => state.topSales)

  useEffect(() => {
    dispatch(fetchTopSales())

  }, [dispatch])

  
  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {status === STATUS_FAILED && (<Error error={error || 'Не удалось получить информацию о товарах'} />)}
      {status === STATUS_LOADING ? (<Preloader />) : (<ProductsList products={topSales} />)}
    </section>
  )
}