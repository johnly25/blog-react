import { Button, Checkbox, Container, Group, Textarea } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useParams } from 'react-router';
import { useAuth } from '../../provider/authProvider';
import axios from 'axios';
const base = import.meta.env.VITE_BACKEND_API_URL_BASE

export function CommentForm() {
    const { postId } = useParams()
    const { token } = useAuth()

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            body: '',
        },
    });

    const handleSubmit = async (values: any) => {
        try {
            const response = await axios.post(base + "/comments/" + postId, {
                body: values.body,
            }, {
                withCredentials: true,
            })
            form.reset()
            console.log(response.data)
        } catch (e) {
            console.log("Error:", e)
        }
    }
    
    return (
        <Container size='xs' pt={20}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Textarea
                    label="Comment"
                    placeholder="Leave a comment"
                    key={form.key('body')}
                    minRows={4}
                    maxRows={4}
                    autosize
                    {...form.getInputProps('body')}
                />
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Container>
    )
}