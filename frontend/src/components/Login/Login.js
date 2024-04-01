import { useState } from "react"
<<<<<<< HEAD
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
=======
import { Box, Button, Container, Heading, Text, TextField, Toast } from "gestalt"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword, AuthErrorCodes, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../firebase/firebase"

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const signIn = () => {
        setError("")
        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user)
        })
        .catch((error) => {
            if(error.code === AuthErrorCodes.INVALID_PASSWORD || error.code === AuthErrorCodes.USER_DELETED) {
                setError('Invalid email or password!')
            } else {
                console.log(error.code)
                alert(error.code)
            }
        })
    }

    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const user = credential.user
            console.log(user)
        })
        .catch((error) => {
            console.log(error.code)
            alert(error.code)
        })
    }

    return (
        <div>
            <Box padding={3}>
                <Container>
                    <Box padding={3}>
                        {error !== null && <Toast text={error} />}
                        <Heading size="md">Log In</Heading>
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
                        <Button
                            onClick={event => {
                                signIn()
                                navigate('/')
                            }}
                            text="Log In"
                            color="blue"
                            inline
                         />
                    </Box>

                    <Box padding={2}>
                        <Text>or</Text>
                    </Box>
                    <Box padding={2}>
                        <Button onClick={signInWithGoogle} text="Sign In With Google" color="red" inline />
                    </Box>
                    <Box padding={2}>
                        <Text>Dont't have an account</Text>
                    </Box>
                    <Box padding={2}>
                        <Link to='signup' className="text-blue-500 hover:text-blue-600">
                            Sign up
                        </Link>
                    </Box>
                    <Box padding={2}>
                        <Link to='forgotPassword' className="text-blue-500 hover:text-blue-600">
                            Forgot Password
                        </Link>
                    </Box>
                </Container>
            </Box>
        </div>
>>>>>>> e50faff93e123e936baff432203054297e20637c
    )
}

export default Login