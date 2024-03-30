import { useEffect } from "react";
import { useDispatch } from "react-redux"

import ProfilePage from './Profile/Profile'
import { Box, Button, Container, Heading } from "gestalt";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch()
    }, [dispatch])

    return (
        <div>
            <ProfilePage />
            <Container>
                <Box padding={3}>
                    <Heading size="md">{`Sign Document`}</Heading>
                </Box>
                <Box padding={3}>
                    <h1>SignList TODO</h1>
                </Box>
                <Box padding={3}>
                    <Heading size="md">{`Prepare Document`}</Heading>
                </Box>
                <Box padding={2}>
                    <Button onClick={event => {
                        navigate(`/assignUser`);
                    }}
                    text="Prepare Document"
                    color="blue"
                    inline />
                </Box>
                <Box padding={3}>
                    <Heading size="md">{`Review Signed Document`}</Heading>
                </Box>
                <Box padding={3}>
                    <h1>Signed List TODO</h1>
                </Box>
            </Container>
        </div>
    )
}

export default HomePage;