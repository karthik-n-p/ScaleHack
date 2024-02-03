import React from 'react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import aboutImage from './assets/about-image.png'; // Add the path to your about image

function AboutPage() {
  return (
    <Box bg="#FBFBFB" p="10" display="flex" flexDirection="column" alignItems="center" textAlign="center">
      <Heading mb="5" color="#0F342E">Our Mission</Heading>

      <Text color="#0F342E" fontSize="xl" mb="4">
        At Neurax, we've made it our mission to outsmart neurodegenerative diseases. No more waiting till it’s too late!
        Be the early bird, catch the worm, <br /> and win the war against senility.
      </Text>

      <Image src={aboutImage} alt="About Image" mb="8" />

      <Text color="#0F342E" fontSize="xl" mb="8">
        Harnessing the power of AI, we’ve successfully developed techniques that detect early signs of neurodegenerative
        diseases with fantastic accuracy. Whether it’s Alzheimer’s, Parkinson’s, or any form of dementia, we’re here to
        stand together and fight it on the frontlines of science—armed with knowledge, compassion, and cutting-edge technology.
      </Text>
    </Box>
  );
}

export default AboutPage;
