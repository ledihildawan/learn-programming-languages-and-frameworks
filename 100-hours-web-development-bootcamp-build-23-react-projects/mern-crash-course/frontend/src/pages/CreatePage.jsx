import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '../store/product';

export default function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const { createProduct } = useProductStore();

  const toast = useToast();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    const status = success ? 'Success' : 'Error';

    toast({
      title: status,
      status: status.toLowerCase(),
      isClosable: true,
      description: message,
    });

    if (success) {
      setNewProduct({ image: '', name: '', price: '' });
    }
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading as="h1" size="2x l" textAlign="center" mb="8">
          Create New Product
        </Heading>

        <Box w="full" bg={useColorModeValue('white', 'gray.800')} p={6} rounded="lg">
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value.trim() })}
            />
            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value.trim() })}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value.trim() })}
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
