import React from 'react';
import {
  Button,
  Heading,
  Text,
  VStack,
  Container,
  Center,
  Flex,
} from '@chakra-ui/react';

const LandingPage = () => {
  return (
    <Container maxW="container.lg">
      <Center p={4} minHeight="70vh">
        <VStack>
          <Container maxW="container.md" textAlign="center">
            <Heading size="2xl" mb={4} color="gray.700">
              You don't have to chase your clients around to get paid
            </Heading>

            <Text fontSize="xl" color="gray.500">
              Freelancers use Biller to accept payments and send invoices to
              clients with a single click
            </Text>
            <Flex gap={20}>
              <Button
                mt={8}
                backgroundColor="blue"
                color="red"
                onClick={() => {
                  console.log('open');
                }}
              >
                Prihlásenie
              </Button>
              <Button
                mt={8}
                backgroundColor="blue"
                color="red"
                onClick={() => {
                  console.log('open');
                }}
              >
                Registrácia
              </Button>
            </Flex>

            <Text my={2} fontSize="sm" color="gray.500">
              102+ builders have signed up in the last 30 days
            </Text>
          </Container>
        </VStack>
      </Center>
    </Container>
  );
};

export default LandingPage;
