import { Box, Button, Container, Heading, Text, TextField } from "gestalt"
import { useState } from "react"
import { Link } from "react-router-dom"
import { signInWithGoogle, signUp } from "../../app/auth"

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault()
        signUp(email, password, displayName)
    }

    return (
        <div className="signup">
            <Box padding={3}>
                <Container>
                <Box padding={3}><Heading size="md">Sign Up</Heading></Box>
                <form autoComplete="off" className="form" onSubmit={handleSubmit}>
                    <Box padding={2}>
                        <TextField
                            id="displayName"
                            onChange={event => setDisplayName(event.value)}
                            placeholder="Enter your name"
                            label="Name"
                            value={displayName}
                        />
                    </Box>
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
                        <Button type="submit" text="Sign Up" color="blue" inline />
                    </Box>
                </form>
        
                <Box padding={2}><Text>or</Text></Box>
                <Box padding={2}>
                    <Button onClick={signInWithGoogle} text="Sign in with Google" color="red" inline />
                </Box>
                <Box padding={2}><Text>Already have an account?</Text></Box>
                <Box padding={2}>
                    <Link to="/login" className="text-blue-500 hover:text-blue-600">Log In</Link>
                </Box>
                </Container>
            </Box>
    </div>
    )
}

export default Signup;