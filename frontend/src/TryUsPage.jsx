import React, { useState } from 'react';
import { Box, Heading, Flex, Button, Input, Text, Image, Select } from '@chakra-ui/react';
import img from './assets/img-icon.png';

function TryUsPage() {
  const [selectedOption, setSelectedOption] = useState("image"); // State for selected option
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState(null); // State for image URL

  // User Data State
  const [userData, setUserData] = useState({
    gender: "",
    age: "",
    educ_input: "",
    ses_input: "",
    mmse_input: "",
    cdr_input: "",
    etiv_input: "",
    nbv_input: "",
    asf_input: "",
  });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0])); // Set image URL
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async () => {
    if (selectedOption === "image" && selectedFile) {
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
          setDesc(data.desc);
        } else {
          console.error('Error:', response.statusText);
          setPrediction("Error occurred during prediction.");
        }
      } catch (error) {
        console.error('Error:', error);
        setPrediction("Error occurred during prediction.");
      }
    } else if (selectedOption === "user_data") {
      // Add logic for handling user data submission
      const userDataPayload = {
        gender: userData.gender,
        age: userData.age,
        educ_input: userData.educ_input,
        ses_input: userData.ses_input,
        mmse_input: userData.mmse_input,
        cdr_input: userData.cdr_input,
        etiv_input: userData.etiv_input,
        nbv_input: userData.nbv_input,
        asf_input: userData.asf_input,
      };

      try {
        const response = await fetch('https://127.0.0.1:5000/classify_person', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDataPayload),
        });

        if (response.ok) {
          const data = await response.json();
          // Handle the response from the backend if needed
          console.log('User data submission successful:', data);
        } else {
          console.error('Error:', response.statusText);
          // Handle the error response from the backend if needed
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle the error if there is an issue with the fetch request
      }

      // Reset user data fields after submission (optional)
      setUserData({
        gender: "",
        age: "",
        educ_input: "",
        ses_input: "",
        mmse_input: "",
        cdr_input: "",
        etiv_input: "",
        nbv_input: "",
        asf_input: "",
      });
    }
  };

  return (
    <Box bg="#FBFBFB" h="100%" p="100px" display="flex" justifyContent="center" gap="32px" alignItems="center">
      {/* Left Side: Image Upload or User Data Form */}
      <Box
        p="20"
        borderWidth="2px"
        borderRadius="lg"
        w="60%"  // Increased width
        bg="white"
        color="black"
        boxShadow="0px 10px 50px rgba(0, 0, 0, 0.1)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        // Increased height
      >
        {/* Dropdown for selecting Image Upload or User Data */}
        <Select
          value={selectedOption}
          onChange={handleOptionChange}
          mb="4"
          color="black"
        >
          <option value="image">Image Upload</option>
          <option value="user_data">User Data</option>
        </Select>

        {selectedOption === "image" ? (
          <>
            <Heading mb="8">Upload Image</Heading>
            <Flex h="100px" w="100px" borderRadius="8px" mb="10px" justify="center" align="center" bg="#D6FFDF">
              {imageUrl ? <Image src={imageUrl} alt="Uploaded Graphic" mb="4" /> : <Image src={img} alt="Upload Graphic" mb="4" />}
            </Flex>
            <Input type="file" mb="4" onChange={handleFileChange} />
          </>
        ) : (
          // Inside the "User Data" section
          <>
            <Heading mb="8">User Data</Heading>
            {/* Add input fields for user data with labels and black stroke */}
            <Flex direction="column" alignItems="flex-start" mb="4">
              <label htmlFor="gender">Gender:</label>
              <Input type="text" name="gender" placeholder="Gender" mb="2" onChange={handleInputChange} color="black" borderColor="black" />
            </Flex>

            <Flex direction="column" alignItems="flex-start" mb="4">
              <label htmlFor="age">Age:</label>
              <Input type="number" name="age" placeholder="Age" mb="2" onChange={handleInputChange} color="black" borderColor="black" />
            </Flex>

            <Flex direction="column" alignItems="flex-start" mb="4">
              <label htmlFor="educ_input">Education Level:</label>
              <Input type="text" name="educ_input" placeholder="Education Level" mb="2" onChange={handleInputChange} color="black" borderColor="black" />
            </Flex>

            <Flex direction="column" alignItems="flex-start" mb="4">
              <label htmlFor="ses_input">Socioeconomic Status:</label>
              <Input type="text" name="ses_input" placeholder="Socioeconomic Status" mb="2" onChange={handleInputChange} color="black" borderColor="black" />
            </Flex>

            <Flex direction="column" alignItems="flex-start" mb="4">
              <label htmlFor="mmse_input">MMSE Score:</label>
              <Input type="text" name="mmse_input" placeholder="MMSE Score" mb="2" onChange={handleInputChange} color="black" borderColor="black" />
            </Flex>

            <Flex direction="column" alignItems="flex-start" mb="4">
              <label htmlFor="cdr_input">CDR Score:</label>
              <Input type="text" name="cdr_input" placeholder="CDR Score" mb="2" onChange={handleInputChange} color="black" borderColor="black" />
            </Flex>

            <Flex direction="column" alignItems="flex-start" mb="4">
              <label htmlFor="etiv_input">Estimated Total Intracranial Volume:</label>
              <Input type="text" name="etiv_input" placeholder="Estimated Total Intracranial Volume" mb="2" onChange={handleInputChange} color="black" borderColor="black" />
            </Flex>

            <Flex direction="column" alignItems="flex-start" mb="4">
              <label htmlFor="nbv_input">Normalized Whole Brain Volume:</label>
              <Input type="text" name="nbv_input" placeholder="Normalized Whole Brain Volume" mb="2" onChange={handleInputChange} color="black" borderColor="black" />
            </Flex>

            <Flex direction="column" alignItems="flex-start" mb="4">
              <label htmlFor="asf_input">Atlas Scaling Factor:</label>
              <Input type="text" name="asf_input" placeholder="Atlas Scaling Factor" mb="2" onChange={handleInputChange} color="black" borderColor="black" />
            </Flex>
          </>
        )}
        <Button colorScheme="teal" onClick={handleImageUpload} w="100%" mt="4">
          {selectedOption === "image" ? "Upload" : "Submit"}
        </Button>
      </Box>

      {/* Right Side: Prediction Display */}
      <Box
        p="8"
        borderWidth="2px"
        borderRadius="lg"
        w="50%"
        bg="white"
        color="black"
        boxShadow="0px 10px 50px rgba(0, 0, 0, 0.1)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading mb="4">Prediction</Heading>
        <Text color="gray.900" mb="4">
          {prediction || "Your prediction will be generated here"}
        </Text>
        <Text color="gray.500">
          {desc || "Description will be shown here"}
        </Text>
      </Box>
    </Box>
  );
}

export default TryUsPage;
