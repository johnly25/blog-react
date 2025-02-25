import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { routes } from './routes';
import AuthProvider from "./provider/authProvider";
import { UserProvider } from './provider/userProvider';
import '@mantine/notifications/styles.css';

function App() {
  return (
    <MantineProvider defaultColorScheme="dark" >
      <AuthProvider>
        <UserProvider>
          {routes}
        </UserProvider>
      </AuthProvider>
    </MantineProvider>
  )
}

export default App
