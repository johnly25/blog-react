import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { routes } from './routes';
import AuthProvider from "./provider/authProvider";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark" >
      <AuthProvider>
        {routes}
      </AuthProvider>
    </MantineProvider>
  )
}

export default App
