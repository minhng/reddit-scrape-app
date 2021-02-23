import React from 'react'
import { Box } from '@chakra-ui/react';

interface WrapperProps {
    variant?: 'small' | 'regular'
    footer?: boolean
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant = 'regular', footer = false }) => {
    return (
        <Box mt={8} mx="auto" maxW={variant === 'regular' ? "860px" : "400px"} w="100%">
            {children}
            {footer ? <Box mt={20} mb={8} d="flex" justifyContent="center" w="100%"
                fontSize="xs" fontWeight="semibold" color="orange"
            >
                Developed using React & Chakra UI. Deployed on AWS
            </Box> : null}
        </Box>
    );
}