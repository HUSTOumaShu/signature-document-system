import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Column, Heading, Link, Text } from 'gestalt';
import { auth } from '../../firebase/firebase';

const ProfilePage = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const email = user.email || "";
    const displayName = user.displayName || "";
    const photoURL = user.photoURL || "";

    return (
        <Box display='flex' direction='row' paddingY={2} color={'lightgrey'}>
            <Column span={9}>
                <Box padding={3}>
                    <Link to='/' className='profileLink'><Heading size='lg'>PDFTron Sign App</Heading></Link>
                </Box>
            </Column>
            <Column span={3}>
                <Box padding={1}>
                    <Avatar name={displayName} size='md' src={photoURL} />
                </Box>
                <Text weight='bold'>{displayName}</Text>
                <Text>{email}</Text>
                <Box padding={1}>
                    <Button onClick={() => {
                        auth.signOut();
                        navigate(`/`);
                    }}
                    accessibilityLabel='Sigout from your account'
                    color='red'
                    text='Signout' />
                </Box>
            </Column>
        </Box>
    )
}

export default ProfilePage;
