import React from 'react';
import { Box, Heading,Flex, Button, Input, Text, Image } from '@chakra-ui/react';
import img from './assets/img-icon.png';

function TryUsPage() {
  const handleImageUpload = () => {
    // Handle image upload logic
  };

  const handlePrediction = () => {
    // Handle prediction logic
  };

  return (
    <Box bg="#FBFBFB" h="90vh" p="4" display="flex" justifyContent="center" gap="32px" alignItems="center">
      {/* Left Side: Image Upload */}
      <Box
        p="8"
        borderWidth="2px"
        borderRadius="lg"
        w="40%"
        bg="white"
        color="black"  // Heading color
        boxShadow="0px 10px 50px rgba(0, 0, 0, 0.1)"  // Drop shadow
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="500px"
      >
        <Heading mb="4">Upload Image</Heading>
        <Flex h="100px" w="100px" borderRadius="8px" mb="10px" justify="center" align="center" bg="#D6FFDF">
        <Image src={img} alt="Upload Graphic" mb="4" />
        </Flex>
        <Input type="file" mb="4" />
        <Button colorScheme="teal" onClick={handleImageUpload} w="100%">
          Upload
        </Button>
      </Box>

      {/* Right Side: Prediction Display */}
      <Box
        p="8"
        borderWidth="2px"
        borderRadius="lg"
        w="50%"
        bg="white"
        color="black"  // Heading color
        boxShadow="0px 10px 50px rgba(0, 0, 0, 0.1)"  // Drop shadow
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading mb="4">Generate Prediction</Heading>
        {/* Placeholder for prediction display */}
        
        <Text color="gray.500" mb="4">
          Your prediction will be generated here
        </Text>
        {/* Button for generating prediction */}
        <Button colorScheme="teal" onClick={handlePrediction} w="100%">
          Predict
        </Button>
      </Box>
    </Box>
  );
}

export default TryUsPage;
