import { Box, Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProductStore } from '../store/product';

export default function HomePage() {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
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

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>

            {products.length === 0 && (
              <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
                No products found 😢 &nbsp;
                <Link to="/create">
                  <Text as="span" color="blue.500" _hover={{ textDecoration: 'underline' }}>
                    Create a product
                  </Text>
                </Link>
              </Text>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
