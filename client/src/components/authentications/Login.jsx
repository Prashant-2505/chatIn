import React, { useState } from 'react'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [show, setShow] = useState(false)



    const submitHandler = () => {

    }

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
                onClick={()=>{
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
