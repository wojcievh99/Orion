import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.scss'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { PageContextProvider } from './context/PageContext.jsx'
import { ArticleContextProvider } from './context/ArticleContext.jsx'
import { UploadRequiredContextProvider } from './context/UploadRequiredContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <UploadRequiredContextProvider>
      <ArticleContextProvider>
        <PageContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </PageContextProvider>
      </ArticleContextProvider>
    </UploadRequiredContextProvider>
  </AuthContextProvider>
)
