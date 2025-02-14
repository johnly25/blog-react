import { Container } from "@mantine/core"
import { Footer } from "../footer/Footer"
import { NavBar } from "../navbar/NavBar"
import { useViewportSize } from '@mantine/hooks';

export function Layout({ children }: { children: JSX.Element }) {
    return (
        <>
            <Container fluid mih={useViewportSize().height} p={0}>
                <NavBar/>
                {children}
            </Container>
            <Footer />
        </>
    )
}