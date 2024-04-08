import { Box, Container, Heading, TextField, Toast, Button } from "gestalt"
import { auth } from "../../firebase/firebase";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

const PasswordReset = () => {

    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const sendResetEmail = (auth, email) => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setEmailSent(true)
            setTimeout(() => {
                setEmailSent(false)
            }, 3000)
            alert(`Password reset email sent to ${email}`)
        }).catch((err) => {
            console.log(err)
            alert(err.message)
        });
    }

    return (
        <div>
            <Box padding={3}>
                <Container>
                    <Box padding={3}>
                        <Heading size="md">Reset your password</Heading>
                    </Box>
                    {emailSent !== false && <Toast text={`Password reset email sent to ${email}`} />}
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
                        <Button onClick={() => sendResetEmail(auth, email)} text="Reset Password" color="blue" inline />
                    </Box>
                    <Box padding={2}>
                        <Link to="/" className="text-blue-500 hover:text-blue-600">Back to Login</Link>
                    </Box>
                </Container>
            </Box>
        </div>
    )
}

export default PasswordReset;