import { useState } from "react"
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
    )
}

export default Login