import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Select, Flex, Box, Center, Text, Button, Image } from '@chakra-ui/react'
import UpliftDAO from '../components/UpliftDAO';

const Home: NextPage = () => {
  return (
    <Box my="4" >
          <Center>
            <Image width="200px" src="/images/logo.png" borderRadius="xl" ></Image>
          </Center>
          <UpliftDAO />
      </Box>
  )
}

export default Home
