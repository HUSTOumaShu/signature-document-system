import { Box, Button, Container, Heading, Table, Text, TextField, Toast } from 'gestalt';
import {useState} from 'react';
import { addSignee, selectSignees } from './AssignSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AssignUser = () => {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [showToast, setShowToast] = useState(false);
    const assignees = useSelector(selectSignees);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(assignees)

    const prepare = () => {
        if(assignees.length > 0) {
            navigate('/prepareDocument')
        } else {
            setShowToast(true)
            setTimeout(() => setShowToast(false), 1000)
        }
    }

    const addUser = (name, email) => {
        const key = `${new Date().getTime()}${email}`;
        if(name !== '' && email !== '') {
            dispatch(addSignee({key, name, email}));
            setEmail('');
            setDisplayName('');
        }
    }

    return (
        <div>
            <Box padding={3}>
                <Container>
                    <Box padding={3}>
                        <Heading size="md">{`Add Sender`}</Heading>
                    </Box>
                    <Box padding={2}>
                        <TextField
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={displayName}
                            onChange={({ event }) => setDisplayName(event.target.value)}
                        />
                    </Box>
                    <Box padding={2}>
                        <TextField
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={({ event }) => setEmail(event.target.value)}
                        />
                    </Box>
                    <Box padding={2}>
                        <Button onClick={event => {
                            addUser(displayName, email)
                        }}
                        text='Add user'
                        color='blue'
                        inline />
                    </Box>
                    <Box padding={2}>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        <Text weight='bold'>Name</Text>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <Text weight='bold'>Email</Text>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {assignees.map((signee) => (
                                    <Table.Row key={signee.key}>
                                        <Table.Cell>
                                            <Text>{signee.name}</Text>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Text>{signee.email}</Text>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Box>
                    <Box padding={2}>
                        <Button onClick={prepare} text='Continue' color='blue' />
                    </Box>
                    <Box 
                        fit
                        dangerouslySetInlineStyle={{
                            __style: {
                                bottom: 50,
                                left: '50%',
                                transform: 'translateX(-50%)',
                            },
                        }}
                        paddingX={1}
                        position='fixed'
                    >
                        {showToast && (
                            <Toast color='red' text='Add at least one sender' />
                        )}
                    </Box>
                </Container>
            </Box>
        </div>
    )
}

export default AssignUser;