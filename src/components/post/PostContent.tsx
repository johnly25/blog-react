import { Container, Group, Text } from "@mantine/core"
import { useParams } from "react-router"
import { useAuth } from "../../provider/authProvider"
import { useEffect, useState } from "react"
import axios from "axios"
import PostType from "./PostType"
import { PostSection } from "./PostSection"
import { Comments } from "./Comments"
import { CommentSection } from "./CommentSection"
const base = import.meta.env.VITE_BACKEND_API_URL_BASE

export function PostContent() {
    const { postId } = useParams()
    const { token } = useAuth()
    const [postInfo, setPostInfo] = useState<PostType | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(base + '/posts/' + postId,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        withCredentials: true
                    },
                );
                const data = response.data
                setPostInfo(data)
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, [])

    return (
        <Container>
            <PostSection post={postInfo} />
            <CommentSection />
        </Container>
    )
}