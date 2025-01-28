import { NavLink, Link, useNavigate } from 'react-router-dom';

import './header.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchItems, setQuery, toggleSearchForm } from '../../features/catalog/catalogSlice';

export const Header = () => {

  const headerMenuLinks = [
    { href: '/', text: 'Главная' },
    { href: '/catalog', text: 'Каталог' },
    { href: '/about', text: 'О магазине' },
    { href: '/contacts', text: 'Контакты' },
  ];

  const cartCount = useAppSelector(state => state.cart.items.length);
  const { search, categoryId, offset, isOpenSearchForm } = useAppSelector(state => state.catalog);
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
    <header className="bg-light">
      <div className='container'>
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light">
              <Link className='navbar-brand' to="/">
                <img src="/img/header-logo.png" alt="Bosa Noga" />
              </Link>
              <div className="collapase navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  {headerMenuLinks.map(link => (
                    <li className="nav-item" key={link.href}>

                      <NavLink
                        className={({ isActive }) =>
                          `nav-link ${isActive ? ' active' : ''}`
                        }
                        to={link.href}
                      >
                        {link.text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <div>
                  <div className="header-controls-pics">
                    <div
                      data-id="search-expander"
                      className="header-controls-pic header-controls-search"
                      onClick={() => dispatch(toggleSearchForm())}
                    ></div>

                    <Link className="header-controls-pic header-controls-cart" to={'/cart'}>
                      {cartCount > 0 && (<div className="header-controls-cart-full">{cartCount}</div>)}
                      <div className="header-controls-cart-menu"></div>
                    </Link>
                  </div>

                  <form onSubmit={(e) => searchItems(e)} data-id="search-form" className={`header-controls-search-form form-inline 
                    ${!isOpenSearchForm ? 'invisible' : ''}`}>
                    <input
                      className="form-control"
                      placeholder="Поиск"
                      onChange={(e) => dispatch(setQuery(e.target.value))}
                      defaultValue={search} />
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}