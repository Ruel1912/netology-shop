import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchItems, setQuery } from './catalogSlice';

const CatalogSearch = () => {

  const { search, categoryId, offset } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const searchItems = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search) {
      dispatch(fetchItems({ offset, category: categoryId, query: search }))
      navigator('/catalog');
    }
  }

  return (
    <>
      <form onSubmit={(e) => searchItems(e)} className="catalog-search-form form-inline">
        <input
          className="form-control"
          placeholder="Поиск"
          onChange={(e) => dispatch(setQuery(e.target.value))}
          defaultValue={search} />
      </form>
    </>
  )
}

export default CatalogSearch