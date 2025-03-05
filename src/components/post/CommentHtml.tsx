import { Avatar, Container, Group, Paper, Text } from "@mantine/core";
import classes from './CommentHtml.module.css'

interface CommentType {
    id: number
    user: UserType
    body: string
    createdAt: string
}

interface UserType {
    fullname: string
}

export function CommentHtml({ comment }: { comment: CommentType }) {
    return (
        <Paper withBorder radius="md" className={classes.comment} mt={20}>
            <Group>
                <Avatar
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                    alt="Jacob Warnhalter"
                    radius="xl"
                />
                <div>
                    <Text fz="sm">{comment.user.fullname}</Text>
                    <Text fz="xs" c="dimmed">
                        {comment.createdAt}
                    </Text>
                </div>
            </Group>
            <Group className={classes.body}>
                <Text className={classes.content}>{comment.body}</Text>
            </Group>
        </Paper>
    );
}