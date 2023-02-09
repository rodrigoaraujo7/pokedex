import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

// react router imports
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes'

// recoil imports
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>,
)
