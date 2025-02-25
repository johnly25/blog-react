import { Layout } from "../layout/Layout";
import { Button, Group } from '@mantine/core';


export function Home() {
    return (
        <Layout>
            <HomePageContent />
        </Layout>
    )
}

function HomePageContent() {

    return (
        <Group>
            <Group>Hello Testing</Group>
        </Group>
    )
}

