import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@ant-design/v5-patch-for-react-19';
import './index.css'
import App from './App.jsx';
import {AlertsProvider} from './Contexts/AlertContext/AlertProvider.jsx';
import { AuthProvider } from './Contexts/AuthContext/AuthProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AlertsProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AlertsProvider>
    </BrowserRouter>
  </StrictMode>,
)
