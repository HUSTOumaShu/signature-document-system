import React from "react";
import {Box, Column, Heading} from 'gestalt'
import 'gestalt/dist/gestalt.css'

const Header = () => {
    return (
        <Box display="flex" direction="row" paddingY={2} color={'lightgray'}>
            <Column span={10}>
                <Box padding={3}>
                    <Heading size="md">Welcome to the Document Management System</Heading>
                </Box>
            </Column>
        </Box>
    )
}

export default Header;