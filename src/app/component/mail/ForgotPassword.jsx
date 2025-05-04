import { Html, Head, Preview, Body, Container, Text, Heading, Button } from '@react-email/components';
import React from 'react';

const ForgotPassword = ({ fullname, resetLink }) => {
    return (
        <Html>
            <Head />
            <Preview>Reset your password</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={heading}>Password Reset Request</Heading>
                    <Text style={text}>Hello {fullname},</Text>
                    <Text style={text}>
                        We received a request to reset your password. Click the button below to proceed:
                    </Text>
                    <Button href={resetLink} style={button}>
                        Reset Password
                    </Button>
                    <Text style={text}>
                        If you didn't request this, please ignore this email.
                    </Text>
                    <Text style={footer}>
                        © {new Date().getFullYear()} Your Company. All rights reserved.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

// Reuse the same styles from SignUp
const main = {
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px',
    maxWidth: '600px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
};

const heading = {
    color: '#333333',
    textAlign: 'center',
};

const text = {
    color: '#555555',
    fontSize: '14px',
    lineHeight: '1.5',
};

const button = {
    backgroundColor: '#0070f3',
    color: '#ffffff',
    padding: '12px 24px',
    textDecoration: 'none',
    borderRadius: '5px',
    display: 'block',
    width: 'fit-content',
    margin: '20px auto',
};

const footer = {
    fontSize: '12px',
    color: '#999999',
    textAlign: 'center',
    marginTop: '30px',
};

export default ForgotPassword;