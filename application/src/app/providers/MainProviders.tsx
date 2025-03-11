import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { mainStore, persistor } from '../stores'
import { PersistGate } from 'redux-persist/integration/react'

interface Props {
  children: ReactNode
}

export const MainProviders = ({ children }: Props) => {
  return (
    <Provider store={mainStore}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}