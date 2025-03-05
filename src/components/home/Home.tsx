import { useAuth } from "../../provider/authProvider";
import { Layout } from "../layout/Layout";
import { Button, Card, Container, Group, Image, Text, Avatar, SimpleGrid, Pagination, Anchor } from '@mantine/core';
import classes from './ArticleCardVertical.module.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
const base = import.meta.env.VITE_BACKEND_API_URL_BASE


export function Home() {
    return (
        <Layout>
            <HomePageContent />
        </Layout>
    )
}

function HomePageContent() {
    const { token } = useAuth()
    return (
        <Container fluid>
            {token ? <BlogPosts /> : <Group>Hello</Group>}
        </Container>
    )
}

function BlogPosts() {
    const [activePage, setPage] = useState(1);
    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const chunkSize = 12;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(base + "/posts/", {
                    withCredentials: true,
                })
                const allPosts = response.data.reverse()
                const chunkPosts = splitArrayIntoChunks(allPosts)
                setPosts(chunkPosts[activePage - 1]);
                setTotalPages(chunkPosts.length)
            } catch (e) {
                console.log("Error in UseEffect:", e)
            }

        }
        fetchData()
    }, [activePage])

    const handlePageChange = (value: any) => {
        setPage(value)
    }

    const splitArrayIntoChunks = (array: Any) => {
        const chunks = []
        if (chunkSize == 0) {
            return 'chunkSize can\'t be 0'
        }

        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            chunks.push(chunk)
        }
        return chunks
    }
    
    const postCards = posts.map((post: Post) => <ArticleCardVertical key={post.id} post={post} />)
    return (
        <Container size='xl' p='lg'>
            <SimpleGrid cols={{ base: 1, sm: 3 }}>
                {postCards}
            </SimpleGrid>
            {/* {items} */}
            <Pagination total={totalPages} value={activePage} onChange={handlePageChange} mt="sm" />

        </Container>
    )
}

interface ArticleCardVerticalProps {
    key: number
    post: Post
}

interface Post {
    id: number,
    title: string
    author: object
}

export function ArticleCardVertical({post, ...props}: ArticleCardVerticalProps) {
    return (
        <Card withBorder radius="md" p={0} className={classes.card}>
            <Group wrap="nowrap" gap={0}>
                <Image
                    src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
                    height={160}
                />
                <div className={classes.body}>
                    <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                        Category
                    </Text>


                    <Text className={classes.title}  mt="xs" mb="md" component={Link} to={'/posts/' + post.id}>
                        {post.title != '' ? post.title : 'no title'}
                    </Text>
                    <Group wrap="nowrap" gap="xs">
                        <Group gap="xs" wrap="nowrap">
                            <Avatar
                                size={20}
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                            />
                            <Text size="xs">{post.author.user.fullname}</Text>
                        </Group>
                        <Text size="xs" c="dimmed">
                            •
                        </Text>
                        <Text size="xs" c="dimmed">
                            Feb 6th
                        </Text>
                    </Group>
                </div>
            </Group>
        </Card>
    )
}

