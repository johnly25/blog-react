import {
    Anchor,
    Button,
    Checkbox,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { Layout } from '../layout/Layout';
import classes from './AuthForm.module.css';
import { useState } from 'react';
import { useAuth } from '../../provider/authProvider';
import { useNavigate } from 'react-router';
import axios from 'axios';

const base = import.meta.env.VITE_BACKEND_API_URL_BASE

export function AuthForm(): JSX.Element {
    return (
        <>
            <Layout>
                <AuthSection />
            </Layout >
        </>
    )
}

export function AuthSection() {
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
        stayLogged: false,
    })
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target)
        setLoginInfo({
            ...loginInfo,
            [name]: value
        })
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setLoginInfo({
            ...loginInfo,
            [name]: checked
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await loginUser()
        if (response?.data.token != undefined) {
            setToken(response.data.token)
            navigate("/", { replace: true });
        } else {
            console.log(response)
            console.log('unsuccesful login')
        }
    }

    const loginUser = async () => {
        try {
            const response = await axios.post(base + '/auth/login/password',
                {
                    username: loginInfo.username,
                    password: loginInfo.password,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true  // This allows sending cookies with the request
                });
            return response;
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <form onSubmit={handleSubmit}>
                    <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                        Welcome back to Mantine!
                    </Title>
                    <TextInput label="Username" placeholder="username" size="md" value={loginInfo.username} name="username" onChange={handleInputChange} />
                    <PasswordInput label="Password" placeholder="password" mt="md" size="md" value={loginInfo.password} name="password" onChange={handleInputChange} />
                    <Checkbox label="Keep me logged in" mt="xl" size="md" name='stayLogged' checked={loginInfo.stayLogged} onChange={handleCheckboxChange} />
                    <Button fullWidth mt="xl" size="md" type='submit'>
                        Login
                    </Button>
                    <Text ta="center" mt="md">
                        Don&apos;t have an account?{' '}
                        <Anchor<'a'> href="#" fw={700} onClick={(event) => event.preventDefault()}>
                            Register
                        </Anchor>
                    </Text>
                </form>

            </Paper>
        </div>
    );
}


