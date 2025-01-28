import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { increaseOffset } from './catalogSlice';
import { STATUS_LOADING } from '../../shared/constants';
import { Preloader } from '../../shared/Preloader';

const CatalogLoaderMoreButton = () => {
  const { items, offset, status, hasMore } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  const loadMoreItems = () => {
    if (hasMore) {
      dispatch(increaseOffset());
    }
  };

  return (
    <>
      {status === STATUS_LOADING && offset > 0 && <Preloader />}

      {hasMore && items.length > 0 && status !== STATUS_LOADING && (
        <div className="text-center">
          <button
            onClick={loadMoreItems}
            className="btn btn-outline-primary"
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </>
  );
};

export default CatalogLoaderMoreButton;
