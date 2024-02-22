import React, { useState } from 'react'
import { VStack, StackDivider, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [pic, setPic] = useState("")

    const [show, setShow] = useState(false)

    const postDetails = (pic) => {

    }

    const submitHandler = () => {

    }

    return (

        <VStack
            spacing={4}
            align='stretch'
        >
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

            </FormControl>
            <FormControl id='email' isRequired >
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

            <FormControl id='password' isRequired >
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        placeholder='Enter your password'
                        value={ConfirmPassword}
                        type={show ? "text" : "password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement w={"4.5rem"}>
                        <Button onClick={() => setShow(!show)}
                            h={"1.75rem"} size="sm">
                            {show ? "hide" : "show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='pic'>
                <Input
                    type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorScheme='blue'
                w={"100%"}
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Sign Up
            </Button>
        </VStack>

    )
}

export default Signup
