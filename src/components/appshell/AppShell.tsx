import { AppShell } from '@mantine/core';
import { NavBar } from '../navbar/NavBar';
import { RouteSwitcher } from '../router';
import { Footer } from '../footer/Footer';

export function Demo() {
    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
        >
            <AppShell.Header>
                <NavBar />
            </AppShell.Header>

            <AppShell.Main>
                <RouteSwitcher />
            </AppShell.Main>
            <AppShell.Footer>
                <Footer></Footer>
            </AppShell.Footer>
        </AppShell>
    );
}

export function Demo2() {
    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
        >
            <AppShell.Header>
                <NavBar />
            </AppShell.Header>

            <AppShell.Main>
                <RouteSwitcher />
            </AppShell.Main>
            <AppShell.Footer>
                
            </AppShell.Footer>
        </AppShell>
    );
}