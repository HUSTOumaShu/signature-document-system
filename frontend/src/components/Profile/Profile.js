import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Column, Heading, Link, Text } from 'gestalt';
import { auth } from '../../firebase/firebase';
import { getUserDocument } from '../../app/user';
import { useSelector } from 'react-redux';
import { selectUser } from '../../firebase/firebaseSlice';

const ProfilePage = () => {
    const navigate = useNavigate();
    const user = auth.currentUser
    console.log(user)

    return (
        <Box display='flex' direction='row' paddingY={2} color={'lightgrey'}>
            <Column span={10}>
                <Box padding={1}>
                    <Avatar name='photoURL' size='md' src={user.photoURL} />
                </Box>
                <Text weight='bold'>{user.displayName}</Text>
            </Column>
            <Column span={2}>
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
