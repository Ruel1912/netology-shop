import { NavLink } from 'react-router-dom';

export const Footer = () => {

  const footerMenuLinks = [
    { href: '/', text: 'Главная' },
    { href: '/catalog', text: 'Каталог' },
    { href: '/about', text: 'О магазине' },
    { href: '/contacts', text: 'Контакты' },
  ];

  const paymentTypes = ['paypal', 'master-card', 'visa', 'yandex', 'webmoney', 'qiwi'];

  return (
    <footer className="bg-light footer">
      <div className='container'>
        <div className="row">
          <div className="col">
            <section>
              <h5>Информация</h5>
              <ul className="nav flex-column">
                {footerMenuLinks.map(link => (
                  <li className="nav-item" key={link.href}>
                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={link.href}>
                      {link.text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="col">
            <section>
              <h5>Принимаем к оплате:</h5>
              <div className="footer-pay">
                {paymentTypes.map(type => <div key={type} className={`footer-pay-systems footer-pay-systems-${type}`}></div>)}
              </div>
            </section>
            <section>
              <div className="footer-copyright">2009-{new Date().getFullYear()} © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.
                Все права защищены.<br />Доставка по всей России!
              </div>
            </section>
          </div>
          <div className="col text-right">
            <section className="footer-contacts">
              <h5>Контакты:</h5>
              <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
              <span className="footer-contacts-working-hours">Ежедневно: с 09-00 до 21-00</span>
              <a className="footer-contacts-email" href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
              <div className="footer-social-links">
                <div className="footer-social-link footer-social-link-twitter"></div>
                <div className="footer-social-link footer-social-link-vk"></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </footer>
  )
}