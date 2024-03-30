import { createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth"
import { Box, Button, Container, Heading, Text, TextField, Toast } from "gestalt"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../firebase/firebase"

const Signup = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRepassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [error, setError] = useState(null)

    const signup = () => {
        setError('')
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user)
        })
        .catch((error) => {
            if(error.code === AuthErrorCodes.WEAK_PASSWORD) setError("Weak Password!")
            else if(error.code === AuthErrorCodes.EMAIL_EXISTS) setError("The email address is already in use")
            else {
                console.log(error.code)
                alert(error.code)
            }
        })
    }

    return (
        <div>
            <Box padding={3}>
                <Container>
                    <Box padding={3}>
                        {error !== null && <Toast text={error} />}
                        <Heading size="md">Sign In</Heading>
                    </Box>
                    <Box padding={2}>
                        <TextField
                            id="displayName"
                            onChange={event => setDisplayName(event.value)}
                            placeholder="Enter your name"
                            label="Name"
                            value={displayName}
                            type="text"
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
                        <TextField
                            id="repassword"
                            onChange={event => setRepassword(event.value)}
                            placeholder="Retype your password"
                            label="Retype password"
                            value={rePassword}
                            type="password"
                        />
                    </Box>
                    <Box padding={2}>
                        <Button onClick={event => {
                            signup()
                            navigate('/') 
                            }}
                            text="Sign up"
                            color="blue"
                            inline
                         />
                    </Box>

                    <Box padding={2}>
                        <Text>or</Text>
                    </Box>
                    <Box padding={2}>
                        <Text>Already have an account?</Text>
                    </Box>
                    <Box padding={2}>
                        <Link to='/' className="text-blue-500 hover:text-blue-600">
                            Log In here
                        </Link>
                    </Box>
                </Container>
            </Box>
        </div>
    )
}

export default Signup;