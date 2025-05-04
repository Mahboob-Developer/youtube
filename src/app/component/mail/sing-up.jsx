import { Html, Head, Preview, Body, Container, Text, Heading, Button } from '@react-email/components';
import React from 'react';

const SignUp = ({ fullname, verificationLink }) => {
    return (
        <Html>
            <Head />
            <Preview>Verify your account</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={heading}>Verify Your Account</Heading>
                    <Text style={text}>Hello {fullname},</Text>
                    <Text style={text}>
                        Thank you for registering! Please verify your email address by clicking the button below:
                    </Text>
                    <Button href={verificationLink} style={button}>
                        Verify Email
                    </Button>
                    <Text style={text}>
                        If you didn't create an account, you can safely ignore this email.
                    </Text>
                    <Text style={footer}>
                        © {new Date().getFullYear()} Your Company. All rights reserved.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

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

export default SignUp;