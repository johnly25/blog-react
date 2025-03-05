import { Container, Text } from "@mantine/core";
import PostType from "./PostType";

export function PostSection({ post }: { post: PostType | null }) {
    if (post) {
        return (
            <Container>
                <Text>
                    {post.title}
                </Text>
                <Text>
                    {post.createdAt}
                </Text>
                <Text>
                    {post.body}
                </Text>
                <Text>
                    {post.authorid}
                </Text>
            </Container>
        )
    }
}