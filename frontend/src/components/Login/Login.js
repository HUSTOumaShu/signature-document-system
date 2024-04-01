import { useState } from "react"
import { Link } from "react-router-dom"
import { signIn, signInWithGoogle } from "../../app/auth"
import { Box, Button, Container, Heading, Text, TextField } from "gestalt"

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        signIn(email, password)
    }

    return (
        <div className="login">
            <Box padding={3}>
                <Container>
                    <Box padding={3}>
                        <Heading size="md">Login</Heading>
                    </Box>
                    <form autoComplete="off" className="form" onSubmit={handleSubmit}>
                        <Box padding={2}>
                            <TextField 
                                id="email"
                                onChange={event => setEmail(event.value)}
                                placeholder="Enter your email"
                                label="Email"
                                value={email}
                                type="email"
                            />
                        </Box>
                        <Box padding={2}>
                            <TextField 
                                id="password"
                                onChange={event => setPassword(event.value)}
                                placeholder="Enter your password"
                                label="Password"
                                value={password}
                                type="password"
                            />
                        </Box>
                        <Box padding={2}>
                            <Button type="submit" text="Login" color="blue" inline />
                        </Box>
                    </form>

                    <Box padding={2}><Text>or</Text></Box>
                    <Box padding={2}>
                        <Button onClick={signInWithGoogle} text="Sign in with Google" color="red" inline />
                    </Box>
                    <Box padding={2}><Text>Don't have an account?</Text></Box>
                    <Box padding={2}>
                        <Link to="/signup" className="text-blue-500 hover:text-blue-600">Sign Up</Link>
                    </Box>
                    <Box padding={2}>
                        <Link to="/forgot-password" className="text-blue-500 hover:text-blue-600">Forgot Password?</Link>
                    </Box>
                </Container>
            </Box>
    </div>
    )
}

export default Login