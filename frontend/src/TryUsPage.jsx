import React, { useState } from 'react';
import { Box, Heading, Flex, Button, Input, Text, Image } from '@chakra-ui/react';
import img from './assets/img-icon.png';

function TryUsPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/classify_image', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setPrediction(data.result);
      } else {
        console.error('Error:', response.statusText);
        setPrediction("Error occurred during prediction.");
      }
    } catch (error) {
      console.error('Error:', error);
      setPrediction("Error occurred during prediction.");
    }
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
        <Input type="file" mb="4" onChange={handleFileChange} />
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
        <Text color="gray.500" mb="4">
          {prediction || "Your prediction will be generated here"}
        </Text>
      </Box>
    </Box>
  );
}

export default TryUsPage;
