import React, { useState } from 'react'
import { VStack,  FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react'

import { initializeApp } from "firebase/app";
import { firebaseConfig, firebaseStorageUrl } from '../../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Signup = () => {

    const toast = useToast()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [pic, setPic] = useState("")
    const [loading, setLoading] = useState(false)

    const [show, setShow] = useState(false)

    const navigate = useNavigate()

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app, firebaseStorageUrl);

    const createUniqueFileName = (getFile) => {
        const timeStamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 12);
        return `${getFile.name}-${timeStamp}-${randomString}`;
    };

    const helperForUploadingImageToFirebase = async (file) => {
        try {
            const getFileName = createUniqueFileName(file);
            const storageReference = ref(storage, `user-pic/${getFileName}`);
            const uploadImg = uploadBytesResumable(storageReference, file);

            return new Promise((resolve, reject) => {
                uploadImg.on('state_changed', (snapshot) => { },
                    (error) => {
                        console.error(error);
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadImg.snapshot.ref)
                            .then((downloadURL) => resolve(downloadURL))
                            .catch((error) => {
                                console.error(error);
                                reject(error);
                            });
                    }
                );
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const postDetails = async (file) => {
        setLoading(true);
        try {
            const extractImageUrl = await helperForUploadingImageToFirebase(file);
            setPic(extractImageUrl)
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Failed to upload image.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        setLoading(false);
    }


    const submitHandler = async () => {
        setLoading(true)
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Warning',
                description: 'Please fill all details.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false)
            return
        }

        if (password !== confirmPassword) {
            toast({
                title: 'Warning',
                description: 'Password not matched.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false)
            return
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            }

            const { data } = await axios.post('http://localhost:9000/api/user',
                { name, email, password, confirmPassword, pic },
                config)

            toast({
                title: 'Sucess',
                description: 'Registeration Succesfull',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });

            localStorage.setItem('userInfo', JSON.stringify(data))
            setLoading(false)
            navigate('/chat')
        } catch (error) {
            toast({
                title: 'error',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false)

        }
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
                        value={confirmPassword}
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
