import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading as="h1" size="2x l" textAlign="center" mb="8">
          Create New Product
        </Heading>

        <Box w="full">
          <VStack spacing={8}>
            <Text
              fontSize={30}
              fontWeight="bold"
              bgGradient="linear(to-r, cyan.400, blue.500)"
              bgClip="text"
              textAlign="center"
            >
              Current Products 🚀
            </Text>

            <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
              No products found 😢 &nbsp;
              <Link to="/create">
                <Text as="span" color="blue.500" _hover={{ textDecoration: 'underline' }}>
                  Create a product
                </Text>
              </Link>
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
