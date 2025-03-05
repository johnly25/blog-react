import { useDisclosure, useCounter } from '@mantine/hooks';
import { Modal, Button, Group, Text, Badge, SimpleGrid, TextInput, Textarea, Container } from '@mantine/core';
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
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            body: '',
        },
    })
    const published = true;

    const handleSubmit = async (values: any) => {
        try {
            const response = await axios.post(base + "/posts/", {
                title: values.title,
                body: values.body,
                published: published,
            }, {
                withCredentials: true,
            })
            close()
            showNotification2()
            console.log(response.data)
        } catch (e) {
            close()
            showErrorNotification()
            console.log("Error:", e)
        }
    }
    const showErrorNotification = () => {
        const position = 'top-right'
        console.log('clicked')
        showNotification({
            title: 'Not Published',
            color: 'red',
            message: 'Your post has not been published!',
            withCloseButton: false,
        })
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
            <Notifications position='top-left'/>
            <Modal opened={opened} onClose={close} size="70%" title="Add New Post">
                <SimpleGrid cols={{ base: 1 }} spacing={10}>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
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
                            <Button type='submit'>Post</Button>
                        </Group>
                    </form>
                </SimpleGrid>
            </Modal>
        </>
    )
}
