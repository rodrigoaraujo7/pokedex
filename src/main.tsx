import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

// react router imports
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes'

// recoil imports
import { RecoilRoot } from 'recoil'

// styled-components
import { ResetCss } from './theme/globalStyles'
import { ThemeProvider } from 'styled-components'
import { dark } from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={dark}>
        <ResetCss />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  </StrictMode>,
)
