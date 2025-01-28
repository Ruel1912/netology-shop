import { MainProviders } from './providers'
import { AppRouter } from './routers'
import './styles/index.css'

const App = () => {
  return (
    <MainProviders>
      <AppRouter />
    </MainProviders>
  )
}

export default App