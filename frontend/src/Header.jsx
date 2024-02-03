import React, { useState } from 'react';
import { Box, Flex, Spacer, IconButton, useColorMode, Button, HStack, Image, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './logo.png';

const Header = () => {
  // Add state for menu or any other functionality if needed

  return (
    <Flex w="100%"  bg="#FBFBFB" >
      <HStack w="100%" display="flex" justify-content="space-between" p="0px 30px" pt="20px" spacing={'5px'}>
        <HStack>
            <Image src={Logo} alt="Logo"  />
            <Text fontSize="24px" fontWeight="Regular" color="#0F342E">
            NEURAX
            </Text>
        </HStack>
        <HStack spacing={4} ml="auto">
            <Link to="/"><Button colorScheme="teal" color="black" variant="ghost" >Home</Button></Link>
            <Link to="/about"><Button colorScheme="teal" color="black" variant="ghost" >About</Button></Link>
            <Button
            as="a"
            href={`https://wa.me/1234567890`}
            target="_blank"
            rel="noopener noreferrer"
            bg="#42CAB2"
            variant="ghost"
          >
            Whatsapp
          </Button>
            <Link to="/try-us"> <Button bg="#42CAB2"  variant="ghost" >Try Us</Button></Link>
           
        </HStack>
      </HStack>
      <Spacer />
      <HStack spacing={4}>
        
      </HStack>
    </Flex>


   
  );
};

export default Header;
