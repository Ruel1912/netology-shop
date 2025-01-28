import Catalog from '../../features/catalog/Catalog';
import { TopSales } from '../../features/topSales/TopSales';

export const MainPage = () => {

  return (
    <>
      <TopSales />
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Catalog />
      </section>
    </>
  )
}