import {
  ChakraProvider,
  Image,
  Text,
  Heading,
  Stack,
  Flex,
  Container,
} from "@chakra-ui/react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Rating from "@/components/Reviews/Rating";
import ProfileImg from "@/components/ProfileTravelerImg";
import { gql } from "@apollo/client";

const GET_AD = gql`
  query getAd($adId: ID!) {
    ad(id: $adId) {
      id
      title
      price
      location
      description
      image
      equipements
      housingType
    }
  }
`;

export default function Ad() {
  return (
    <ChakraProvider>
      <Navbar />
      <Stack spacing={4} m="auto" width="84%" mt={5} textAlign="left">
        <Flex justifyContent="flex-start">
          <ProfileImg />
        </Flex>
        {/* <TagAd /> */}
        <Text fontSize="2xl">title</Text>
        <Text fontSize="1xl">Orléans, Val de Loire </Text>
        <Rating />
      </Stack>
      <Footer />
    </ChakraProvider>
  );
}
