import React, { useState } from 'react'
import { VStack, FormControl, FormLabel, useToast, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false)

    const toast = useToast(); // Added useToast hook for displaying toasts
    const navigate = useNavigate()


    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!email || !password) {
                toast({
                    title: 'Warning',
                    description: 'Please fill in all details.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
                return; // Avoid unnecessary setLoading(false) here
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post('http://localhost:9000/api/user/login', { email, password }, config);

            toast({
                title: 'Success',
                description: 'Login Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/chat');
        } catch (error) {
            console.error(error); // Log the actual error for debugging
            toast({
                title: 'Error',
                description: 'An error occurred during login.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
        } finally {
            setLoading(false); // Ensure setLoading(false) in all scenarios
        }
    };

    return (

        <VStack
            spacing={4}
            align='stretch'
        >

            <FormControl id='Email' isRequired >
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter your email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

            </FormControl>

            <FormControl id='password' isRequired >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        placeholder='Enter your password'
                        value={password}
                        type={show ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement w={"4.5rem"}>
                        <Button onClick={() => setShow(!show)}
                            h={"1.75rem"} size="sm">
                            {show ? "hide" : "show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>

            </FormControl>



            <Button
                colorScheme='blue'
                w={"100%"}
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Log In
            </Button>

            <Button
                colorScheme='blue'
                w={"100%"}
                style={{ marginTop: 15 }}
                onClick={() => {
                    setEmail("guest@example.com");
                    setPassword("123456")
                }}
            >
                Get Guest User Credentials
            </Button>

        </VStack>

    )
}

export default Login
