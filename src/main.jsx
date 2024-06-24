import './index.css'
import React from 'react'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'

import { Toaster } from 'sonner'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
        <Toaster 
          richColors 
          visibleToasts={1} 
          position='bottom-right' 
        />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
)
