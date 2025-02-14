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
    const [signupInfo, setSignUpInfo] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirmpassword: "",
        author: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target)
        setSignUpInfo({
            ...signupInfo,
            [name]: value
        })
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        console.log(e.target.checked)
        setSignUpInfo({
            ...signupInfo,
            [name]: checked
        })
    }

    const ObjectIsEmpty = (obj): boolean => {
        return JSON.stringify(obj) === "{}"
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await addUser()
        console.log(response)
        if (hasErrors(response)) {
            setSignUpErrors(response.errors)
        } else {
            setSignUpErrors([])
            setSignedUp(true)
        }
    }

    const addUser = async () => {
        try {
            const response = await fetch(base + '/users', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        firstname: signupInfo.firstname,
                        lastname: signupInfo.lastname,
                        username: signupInfo.username,
                        password: signupInfo.password,
                        passwordConfirm: signupInfo.confirmpassword,
                        email: signupInfo.email,
                        author: signupInfo.author,
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
        <form onSubmit={handleSubmit}>
            <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                Sign up
            </Title>
            {errors}
            <SimpleGrid cols={2}>
                <TextInput label="First Name" placeholder="John" size="md" name="firstname" value={signupInfo.firstname} onChange={handleInputChange} />
                <TextInput label="Last Name" placeholder="Smith" size="md" name="lastname" value={signupInfo.lastname} onChange={handleInputChange} />
            </SimpleGrid>
            <TextInput label="Email address" placeholder="hello@gmail.com" mt="md" size="md" name="email" value={signupInfo.email} onChange={handleInputChange} />
            <TextInput label="Username" placeholder="kazuha" mt="md" size="md" name="username" value={signupInfo.username} onChange={handleInputChange} />
            <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" name="password" value={signupInfo.password} onChange={handleInputChange} />
            <PasswordInput label="Confirm Password" placeholder="Your password" mt="md" size="md" name="confirmpassword" value={signupInfo.confirmpassword} onChange={handleInputChange} />
            <Checkbox label="Become an Author?" mt="md" name='author' checked={signupInfo.author} onChange={handleCheckboxChange} />
            <Button fullWidth mt="xl" size="md" type='submit'>
                Signup
            </Button>
        </form>
    )
} 