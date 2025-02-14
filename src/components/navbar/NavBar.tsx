import {
  Anchor,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './NavBar.module.css';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../provider/authProvider';

export function NavBar(props: any) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  //need to see if token is available 
  const { token } = useAuth();

  return (
    <Box {...props}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <MantineLogo size={30} />
          <Group h="100%" gap={0} visibleFrom="sm">
            <Anchor component={Link} to='/' className={classes.link}>
              Home
            </Anchor>
          </Group>
          {!token &&
            <Group visibleFrom="sm">
              <SignupAndLoginBtns />
            </Group>
          }
          {token &&
            <LogoutBtn />
          }

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>
      <DrawerPart drawerOpened={drawerOpened} closeDrawer={closeDrawer} />
    </Box>
  );
}

function LogoutBtn() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    console.log('logging out')
    setToken();
    navigate("/", { replace: true });
  }

  return (
    <Group visibleFrom="sm">
      <Button onClick={handleLogout}>Log out</Button>
    </Group>
  )
}

function DrawerPart({ drawerOpened, closeDrawer }) {
  const { token } = useAuth();

  return (
    <>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          <a href="#" className={classes.link}>
            Home
          </a>
          <Divider my="sm" />

          {!token &&
            <Group justify="center" grow pb="xl" px="md">
              <SignupAndLoginBtns />
            </Group>
          }

        </ScrollArea>
      </Drawer>
    </>
  )
}

function SignupAndLoginBtns() {
  return (
    <>
      <Button variant="default" component={Link} to="/login">Log in</Button>
      <Button component={Link} to="/signup"> Sign up </Button>
    </>
  )
}