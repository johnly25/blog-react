import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeaderMegaMenu } from '../navbar/NavBar';

export function Demo() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            // navbar={{
            //     width: 300,
            //     breakpoint: 'sm',
            //     collapsed: { mobile: !opened },
            // }}
            padding="md"
        >
            <AppShell.Header>
                {/* <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <div>Logo</div> */}
                <HeaderMegaMenu />
            </AppShell.Header>
            {/* <AppShell.Navbar>
            </AppShell.Navbar> */}
            <AppShell.Main>Main</AppShell.Main>
        </AppShell>
    );
}