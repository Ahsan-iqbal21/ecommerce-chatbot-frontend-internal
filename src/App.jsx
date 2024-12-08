import ThemeCustomization from './themes'
import Routes from './routes/index';
import { UserProvider } from './contexts/userContext';
import './App.css'
import ThemeRoutes from './routes/index';

function App() {
  return (
    <ThemeCustomization>
      <UserProvider>
        <ThemeRoutes />
      </UserProvider>
    </ThemeCustomization>
  )
}

export default App
  