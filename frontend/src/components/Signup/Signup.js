<<<<<<< HEAD
import { Box, Button, Heading, Text, TextField } from "gestalt"
import { useState } from "react"
import { Link } from "react-router-dom"
import { signInWithGoogle, signUp } from "../../app/auth"

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault()
        signUp(email, password)
    }

    return (
        <div className="signup">
            <Box padding={3}><Heading size="md">Sign Up</Heading></Box>
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
    </div>
=======
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
>>>>>>> e50faff93e123e936baff432203054297e20637c
    )
}

export default Signup;