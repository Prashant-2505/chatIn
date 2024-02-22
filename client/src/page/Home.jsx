import React from 'react'
import { Container, Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import Login from '../components/authentications/Login'
import Signup from '../components/authentications/Signup'
const Home = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box
        display='flex'
        justifyContent='center'
        p={3} bg={'white'}
        w={"100%"} m={"40px 0 15px 0"}
        borderRadius={"lg"}
        borderWidth={'1px'}
      >
        <Text fontSize={"4xl"}>Chat-In</Text>
      </Box>
      <Box
        bg={"white"} w={"100%"} p={4} borderRadius={"lg"} borderWidth={'1px'}
      >
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList
            mb={"1rem"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Tab w={"50%"}>Log in</Tab>
            <Tab w={"50%"}>Sign up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Home
