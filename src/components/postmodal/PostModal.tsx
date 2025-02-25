import { useDisclosure, useCounter } from '@mantine/hooks';
import { Modal, Button, Group, Text, Badge, SimpleGrid, TextInput, Textarea } from '@mantine/core';
import { useAuth } from '../../provider/authProvider';
import axios from 'axios';
import { useState } from 'react';
import { Notifications, notifications, showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
const base = import.meta.env.VITE_BACKEND_API_URL_BASE

interface PostModalProps {
    open: boolean,
    opened: boolean,
    close: () => void,
}

export function PostModal({ opened, open, close }: PostModalProps) {
    const { token } = useAuth();
    const [postInfo, setPostInfo] = useState({
        title: "this is title",
        body: "",
    });

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: 'this is',
            body: '',
        },
    })
    const published = true;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target)
        setPostInfo({
            ...postInfo,
            [name]: value
        })
    }

    const handeSubmit = async (e: any) => {
        console.log('submitting', e)
        try {
            const response = await axios.post(base + "/posts/", {
                title: postInfo.title,
                body: postInfo.body,
                published: published,
            }, {
                withCredentials: true,
            })
            close()
            showNotification2()
            console.log(response.data)
        } catch (e) {
            console.log("Error:", e)
        }
    }
    const handleSubmit2 = async (values: any) => {
        console.log(values)
    }

    const showNotification2 = () => {
        const position = 'top-right'
        console.log('clicked')
        showNotification({
            title: 'Published',
            message: 'Your post has been published!',
            withCloseButton: false,
        })

    }
    return (
        <>
            <Notifications />
            <Modal opened={opened} onClose={close} size="70%" title="Add New Post">
                <SimpleGrid cols={{ base: 1 }} spacing={10}>
                    <form onSubmit={form.onSubmit((values) => handleSubmit2(values))}>
                        <TextInput
                            label="Title"
                            placeholder="Title"
                            name="title"
                            key={form.key('title')}
                            {...form.getInputProps('title')}
                        />
                        <Textarea
                            required
                            label="Your message"
                            placeholder="Write Something"
                            autosize
                            minRows={4}
                            mt="md"
                            name="body"
                            key={form.key('body')}
                            {...form.getInputProps('body')}
                        />

                        <Group justify="flex-end" mt="md">
                            <Button  type='submit'>Post</Button>
                        </Group>
                    </form>
                </SimpleGrid>
            </Modal>
        </>
    )
}
