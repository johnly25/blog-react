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
        if(response.token != undefined) {
            setToken(response.token)
            navigate("/", { replace: true });
        } else {
            //unsuccessful 
        }
    }

    const loginUser = async () => {
        try {
            const response = await fetch(base + '/auth/login/password', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        username: loginInfo.username,
                        password: loginInfo.password,
                    }
                )
            })
            return response.json();
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
                    <Checkbox label="Keep me logged in" mt="xl" size="md" name='stayLogged' checked={loginInfo.stayLogged} onChange={handleCheckboxChange}/>
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


