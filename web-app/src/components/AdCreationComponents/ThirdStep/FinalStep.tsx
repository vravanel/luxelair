import { Button, Heading, VStack } from "@chakra-ui/react";

interface Props {
  onSubmit: () => void;
}
const FinalStep: React.FC<Props> = ({ onSubmit }) => {
  const handleClick = () => {
    onSubmit();
  };
  return (
    <VStack height={'40vh'}> 
      <Button onClick={handleClick}>Publier mon annonce</Button>
      </VStack> 
  );
};

export default FinalStep;
