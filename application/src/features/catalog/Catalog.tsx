import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ProductsList } from '../../pages/catalog/ProductList'
import CatalogCategories from './CatalogCategories'

import './catalog.css'
import { STATUS_FAILED, STATUS_IDLE, STATUS_LOADING } from '../../shared/constants'
import { fetchItems } from './catalogSlice'
import { Error } from '../../shared/Error'
import { Preloader } from '../../shared/Preloader'
import CatalogLoaderMoreButton from './CatalogLoaderMoreButton'

const Catalog = () => {

  const dispatch = useAppDispatch()

  const { items, categoryId, offset, status, search, error } = useAppSelector(state => state.catalog)

  useEffect(() => {
    if (status === STATUS_IDLE) {
      dispatch(fetchItems({ offset, category: categoryId, query: search }))
    }
  }, [status, dispatch, categoryId, offset, search])

  if (status === STATUS_FAILED) return <Error error={error || 'Не удалось получить информацию о товарах'} />

  return (
    <>
      <CatalogCategories />
      {status === STATUS_LOADING && offset === 0
        ? (<Preloader />)
        : (<ProductsList products={items} />)
      }
      {items.length > 0 && <CatalogLoaderMoreButton />}
    </>
  )
}

export default Catalog