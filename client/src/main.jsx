import { StrictMode } from 'react'
// import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import store from './store/store'
// import {Provider} from 'react-redux'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Toaster } from 'sonner'
import { useLoadUserQuery } from './redux/api/authApi'
import LoadingSpinner from './components/LoadingSpiner'

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <LoadingSpinner/> : <>{children}</>}</>;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <Custom>
      <App />
      <Toaster />
      </Custom>
      </Provider>
      
      </StrictMode>


)
