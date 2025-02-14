import {
    Button,
    Checkbox,
    Paper,
    PasswordInput,
    SimpleGrid,
    TextInput,
    Title,
    Text,
} from '@mantine/core';
import classes from './SignUpForm.module.css';
import { useState } from 'react';

const base = import.meta.env.VITE_BACKEND_API_URL_BASE

export function ThankYouSection() {
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Text>Thank you for Signing up!</Text>
            </Paper>
        </div>
    );
}

