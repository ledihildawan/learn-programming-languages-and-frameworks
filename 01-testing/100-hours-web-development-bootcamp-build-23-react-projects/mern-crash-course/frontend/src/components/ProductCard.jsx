import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '../store/product';

export default function ProductCard({ product }) {
  const { deleteProduct, updateProduct } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const bg = useColorModeValue('white', 'gray.800');
  const toast = useToast();
  const textColor = useColorModeValue('gray.600', 'gray.200');

  const handleUpdateProduct = async (pid) => {
    const { success, message } = await updateProduct({ _id: pid, ...updatedProduct });

    onClose();

    showToast(success, message);
  };

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    showToast(success, message);
  };

  const showToast = (success, message) => {
    const status = success ? 'Success' : 'Error';

    toast({
      title: status,
      status: status.toLowerCase(),
      isClosable: true,
      description: message,
    });
  };

  return (
    <>
      <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transition: 'translateY(-5px)', shadow: 'xl' }}
        bg={bg}
      >
        <Image src={product.image} alt={product.name} w="full" objectFit="cover" />

        <Box p={4}>
          <Heading as="h3" size="md" mb={2}>
            {product.name}
          </Heading>

          <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
            ${product.price}
          </Text>

          <HStack spacing={2}>
            <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
            <IconButton icon={<DeleteIcon />} colorScheme="red" onClick={() => handleDeleteProduct(product._id)} />
          </HStack>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value.trim() })}
              />
              <Input
                placeholder="Price"
                name="price"
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value.trim() })}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value.trim() })}
              />

              <Button colorScheme="blue" onClick={() => handleUpdateProduct(product._id)} w="full">
                Update Product
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
