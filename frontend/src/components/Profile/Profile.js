import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, setUser } from '../../firebase/firebaseSlice';
import { Avatar, Box, Button, Column, Heading, Link, Text } from 'gestalt';
import { getAuth } from 'firebase/auth';
import { firebase } from '../../firebase/firebase';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const { email} = user;
    const auth = getAuth(firebase)

    return (
        <Box display='flex' direction='row' paddingY={2} color={'lightgrey'}>
            <Column span={9}>
                <Box padding={3}>
                    <Link to='/' className='profileLink'><Heading size='lg'>PDFTron Sign App</Heading></Link>
                </Box>
            </Column>
            <Column span={3}>
                <Box padding={1}>
                    <Avatar size='md' />
                </Box>
                <Text weight='bold'>{}</Text>
                <Text>{email}</Text>
                <Box padding={1}>
                    <Button onClick={() => {
                        auth.signOut();
                        dispatch(setUser(null));
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
