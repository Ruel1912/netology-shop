import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { STATUS_FAILED, STATUS_IDLE } from '../../shared/constants';
import { fetchCategories, toggleCategory } from './catalogSlice';
import { Error } from '../../shared/Error';

export interface ICategory {
  id: number;
  title: string;
}

const CatalogCategories = () => {

  const dispatch = useAppDispatch()

  const { items, categories, categoryId, status, error } = useAppSelector(state => state.catalog)

  const handleCategoryClick = (evt: React.MouseEvent, id: number | null) => {
    evt.preventDefault()
    dispatch(toggleCategory(id))
  }

  useEffect(() => {
    if (status === STATUS_IDLE || !categories.length) {
      dispatch(fetchCategories())
    }
  }, [dispatch, status, categories])

  if (status === STATUS_FAILED) return <Error error={error || 'Не удалось получить категории товаров'} />

  if (!items.length) return null

  return (
    <ul className="catalog-categories nav justify-content-center">
      {categories.map((category: ICategory) => (
        <li className="nav-item" key={category.id}>
          <a
            className={`nav-link ${categoryId === category.id ? 'active' : ''}`}
            onClick={(evt) => handleCategoryClick(evt, category.id)}
            href="#">{category.title}</a>
        </li>
      ))}
    </ul>
  )
}

export default CatalogCategories