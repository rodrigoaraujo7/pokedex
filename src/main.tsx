import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

// react router imports
import { BrowserRouter } from 'react-router-dom'

import AppRouter from './routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>,
)
