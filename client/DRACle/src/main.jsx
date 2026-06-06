import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import i18n from './locales/i18n'
import AuthProvider from './providers/AuthProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
