import React from 'react';
import { Box, HStack, VStack, Text, Button, Image,Flex } from '@chakra-ui/react';
import Alzhimers from "./assets/Alzheimer.png";
import { Link } from 'react-router-dom';

function App() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg="#FBFBFB"
      height="90vh" // Set the height to 100% of the viewport height
    >
      <HStack pl="150px " pr="138px">
     
        <VStack display="flex" align="left" spacing={4}  >
          <Text width="500px"  fontSize="64px" lineHeight="60px" fontWeight="bold" color="#234046">
            Prevention is <Text color="#42CAB2"> better</Text>  than cure
          </Text>
          <Text  fontSize="16px"  color="#234046">
    Effortlessly decode MRI scans, ensuring instant, precise  descriptions for comprehensive health insights.
          </Text>
          <Link to="/try-us"><Button w="150px" h="50px" bg="#42CAB2"  variant="ghost" >Try Us</Button></Link>
      
        </VStack>

        {/* Right Side: Image */}
        <Image height="600px" width="800px" src={Alzhimers} alt="Logo" />
      </HStack>
    </Flex>
  );
}

export default App;
