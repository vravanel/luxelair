import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Text,
  Heading,
  IconButton,
  Input,
  VStack,
  useEditableControls,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  value: number;
  onChange: (newValue: number) => void;
}

const AdPrice: React.FC<Props> = ({ value, onChange }) => {
  const [price, setPrice] = useState(value);

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(e.target.value);
    setPrice(newValue);
    onChange(newValue);
  }
  
  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();
    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />}  {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <VStack height={"41vh"}>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
        <Heading p={10} textAlign={"left"}>
          À présent, fixez votre prix
        </Heading>

        <Text fontSize='md' textAlign={'center'} color={"gray"}>Vous pouvez le modifier à tout moment.</Text>
        <Editable
          textAlign="center"
          defaultValue={price.toString()}
          fontSize="7xl"
          isPreviewFocusable={false}
        >
          <EditablePreview />
          <Input
            as={EditableInput}
            width={"30vw"}
            value={price}
            onChange={handlePriceChange} // Handle input change
          />
          $
          <EditableControls />
        </Editable>
        <Text fontSize='md' textAlign={'center'} p={'30px'}>Prix à payer par le voyageur {parseFloat(price) + 1}$</Text>
     
      </Box>
    </VStack>
  );
};

export default AdPrice;
