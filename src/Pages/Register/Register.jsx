import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebase-config';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff', // White text for dark theme
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fixes IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#1db954', // green
        color: '#fff',
        '&:hover': {
            backgroundColor: '#1ed760', // Hover effect
        },
    },
    container: {
        backgroundColor: '#181818', // Dark background color
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        marginTop: '200px', // Adjust based on your navbar height
    },
    textField: {
        '& .MuiInputBase-root': {
            color: '#fff', // Text color in the input field
        },
        '& .MuiInputLabel-root': {
            color: '#bbb', // Label color
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#555', // Border color
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#888', // Hover border color
        },
        '&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1db954', // Border color when focused
        },
    },
}));

export default function Register({ onRouteChange }) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            onRouteChange('home');
        } catch (error) {
            console.error('Error registering user:', error.message);
            setError('Not properly filled: email or password');
        }
    };

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} onSubmit={handleRegister}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={classes.textField}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={classes.textField}
                    />
                    {error && (
                        <Typography variant="body2" color="error" align="center">
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        Register
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link style={{ cursor: 'pointer', color: '#1db954' }} onClick={() => onRouteChange('signin')} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5} />
        </Container>
    );
}
