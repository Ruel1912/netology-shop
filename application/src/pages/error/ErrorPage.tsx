import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
    <section className="top-sales">
      <h2 className="text-center">Страница не найдена</h2>
      <p className="text-center">
        Извините, такая страница не найдена!
      </p>
      <Link className="btn btn-primary" style={{ display: 'block', margin: '0 auto', width: 'fit-content' }} to={'/'}>Вернуться на главную</Link>
    </section>
  )
}