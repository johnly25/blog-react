/* eslint-disable react/display-name */
import {
  Anchor,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Menu,
  Text,
  UnstyledButton,
  Avatar,
  Notification
} from '@mantine/core';
import { forwardRef, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './NavBar.module.css';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../provider/authProvider';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconArrowsLeftRight,
  IconLogout
} from '@tabler/icons-react';
import { WritePostBtn } from '../writepostbtn/WritePostBtn';
import { useUser } from '../../provider/userProvider';

export function NavBar(props: any) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  //need to see if token is available 
  const { token } = useAuth()

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

          {token && <WritePostBtn />}
          {token &&
            <AvatarIconDropwDown />
          }
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>
      <DrawerPart drawerOpened={drawerOpened} closeDrawer={closeDrawer} />
    </Box>
  );
}

type User = {
  author: object
  email: string,
  fullname: string,
  id: number,
  username: string
}

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  icon?: React.ReactNode;
  user: User | null;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ user, ...props }: UserButtonProps, ref) => {
    return (
      < UnstyledButton {...props} ref={ref} className={classes.user} >
        <Group>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
            radius="xl"
          />
          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {user?.fullname}
            </Text>

            <Text c="dimmed" size="xs">
              {user?.email}
            </Text>
          </div>
        </Group>
      </UnstyledButton >
    )
  }
)



function AvatarIconDropwDown() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const user = useUser()?.user || null

  const handleLogout = () => {
    console.log('logging out')
    setToken();
    navigate("/", { replace: true });
  }

  return (
    <Group>
      <Menu>
        <Menu.Target>
          <UserButton user={user} />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item leftSection={<IconSettings size={14} />}>
            Settings
          </Menu.Item>
          <Menu.Item leftSection={<IconMessageCircle size={14} />}>
            Messages
          </Menu.Item>
          <Menu.Item leftSection={<IconPhoto size={14} />}>
            Gallery
          </Menu.Item>
          <Menu.Item
            leftSection={<IconSearch size={14} />}
            rightSection={
              <Text size="xs" c="dimmed">
                ⌘K
              </Text>
            }
          >
            Search
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            leftSection={<IconArrowsLeftRight size={14} />}
          >
            Transfer my data
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconLogout size={14} />} onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

    </Group>
  )
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