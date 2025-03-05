import { Container } from "@mantine/core";
import { CommentForm } from "./CommentForm";
import { Comments } from "./Comments";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
import { useParams } from "react-router";
const base = import.meta.env.VITE_BACKEND_API_URL_BASE

export function CommentSection () {
    const { postId } = useParams()
    const [comments, setComments] = useState([])
    const {token} = useAuth()

    const fetchData = async () => {
        try {
            const response = await axios.get(base + '/comments/' + postId,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    withCredentials: true
                },
            )
            const data = response.data
            setComments(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <Container>
            <CommentForm/>
            <Comments comments={comments} setComments={setComments} fetchData={fetchData}/>
        </Container>
    )
}