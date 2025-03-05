import { Container, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../provider/authProvider"
import { CommentHtml } from "./CommentHtml";
const base = import.meta.env.VITE_BACKEND_API_URL_BASE

interface CommentType {
    id: number
    user: UserType
    body: string
    createdAt: string
}

interface UserType {
    fullname: string
}

interface CommentsProps {
    comments: Array<CommentType>,
    setComments: React.Dispatch<React.SetStateAction<never[]>>
    fetchData: () => void;
}

export function Comments({ comments, setComments, fetchData }: CommentsProps) {
    const { postId } = useParams()
    const { token } = useAuth()

    useEffect(() => {
        fetchData()
    }, [])

    const commentSection = comments.map((comment) =>
        <CommentHtml key={comment.id} comment={comment}></CommentHtml>
    )

    return (
        <Container>
            <Text>Comments</Text>
            {commentSection}
        </Container>
    )
}

