import {
    Button,
    Checkbox,
    Paper,
    PasswordInput,
    SimpleGrid,
    TextInput,
    Title, Text
} from '@mantine/core';
import { Layout } from '../layout/Layout';
import classes from './SignUpForm.module.css';
import { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from '@mantine/form';

const base = import.meta.env.VITE_BACKEND_API_URL_BASE

export function SignUpForm(): JSX.Element {
    return (
        <>
            <Layout>
                <FormSection />
            </Layout >
        </>
    )
}

export function FormSection() {
    const [signedUp, setSignedUp] = useState(false)


    return (
        <div className={!signedUp ? classes.wrapper : classes['wrapper-signedup']}>
            <Paper className={classes.form} radius={0} p={30}>
                {signedUp ? <ThankYou></ThankYou> : <FormSection2 setSignedUp={setSignedUp} />}
            </Paper>
        </div>
    );
}

function ThankYou() {
    return (
        <>
            <Title >Thank you for signing up</Title>
            <Text size="xl" mt="xl">
                Please continue to login
            </Text>
            <Button variant="default" component={Link} to="/login" mt={5}>Log in</Button>

        </>
    )
}

function FormSection2({ setSignedUp }) {
    const [signUpErrors, setSignUpErrors] = useState([])

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            confirmpassword: "",
            author: true,
        },
    })

    const handleSubmit = async (values) => {
        const response = await addUser(values)
        console.log(response)
        if (hasErrors(response)) {
            setSignUpErrors(response.errors)
        } else {
            setSignUpErrors([])
            setSignedUp(true)
        }
    }

    const addUser = async (values) => {
        try {
            const response = await fetch(base + '/users', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        firstname: values.firstname,
                        lastname: values.lastname,
                        username: values.username,
                        password: values.password,
                        passwordConfirm: values.confirmpassword,
                        email: values.email,
                        author: values.author,
                    }
                )
            })
            return response.json();
        } catch (e) {
            console.log(e)
        }
    }

    const hasErrors = (response): boolean => {
        return response.hasOwnProperty('errors')
    }
    
    const errors = signUpErrors.map((error, index) => <li key={index}>{error.msg}: {error.path}</li>)

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                Sign up
            </Title>
            {errors}
            <SimpleGrid cols={2}>
                <TextInput label="First Name" placeholder="John" size="md" name="firstname" key={form.key('firstname')} {...form.getInputProps('firstname')} />
                <TextInput label="Last Name" placeholder="Smith" size="md" name="lastname" key={form.key('lastname')} {...form.getInputProps('lastname')} />
            </SimpleGrid>
            <TextInput label="Email address" placeholder="hello@gmail.com" mt="md" size="md" name="email" key={form.key('email')} {...form.getInputProps('email')} />
            <TextInput label="Username" placeholder="kazuha" mt="md" size="md" name="username" key={form.key('username')} {...form.getInputProps('username')} />
            <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" name="password" key={form.key('password')} {...form.getInputProps('password')} />
            <PasswordInput label="Confirm Password" placeholder="Your password" mt="md" size="md" name="confirmpassword" key={form.key('confirmpassword')} {...form.getInputProps('confirmpassword')} />
            <Checkbox label="Become an Author?" mt="md" name='author' key={form.key('author')} {...form.getInputProps('author', { type: 'checkbox' })} />
            <Button fullWidth mt="xl" size="md" type='submit'>
                Signup
            </Button>
        </form>
    )
} 