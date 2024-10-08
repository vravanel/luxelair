import { Badge, Box, Image, Link } from "@chakra-ui/react";

interface props {
  id: string;
  location: string;
  price: number;
  image: string;
}

const Card: React.FC<props> = ({ id, location, price, image }) => {
  return (
    <Link href={`/ad/${id}`} _hover={{ textDecoration: "none" }}>
      <Box
        cursor="pointer"
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Image objectFit="cover" src={image} alt={id} />

        <Box p="6"></Box>
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" bg="#B4770A" color="white">
            New
          </Badge>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {location}
        </Box>

        <Box>
          {price}
          <Box as="span" color="gray.600" fontSize="sm"></Box>
        </Box>
      </Box>
    </Link>
  );
};

export default Card;
