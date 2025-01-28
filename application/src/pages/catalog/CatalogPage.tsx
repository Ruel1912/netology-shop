
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchItems } from '../../features/catalog/catalogSlice'
import { Preloader } from '../../shared/Preloader'
import { Error } from '../../shared/Error'
import Catalog from '../../features/catalog/Catalog'
import { STATUS_FAILED, STATUS_IDLE, STATUS_SUCCEEDED } from '../../shared/constants'
import CatalogSearch from '../../features/catalog/CatalogSearch'

export const CatalogPage = () => {

  const { items, offset, categoryId, search, status, error } = useAppSelector(state => state.catalog)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (status === STATUS_IDLE) {
      dispatch(fetchItems({ offset, category: categoryId, query: search }))
    }

  }, [status, dispatch, categoryId, offset, search])

  if (status === STATUS_FAILED) return <Error error={error || 'Не удалось загрузить информацию о товарах, попробуйте ещё раз'} />
  if (status !== STATUS_SUCCEEDED) return <Preloader />

  if (!items.length) {
    return null;
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <CatalogSearch />
      <Catalog />
    </section>
  )
}