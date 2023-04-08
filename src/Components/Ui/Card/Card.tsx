// External dependencies
import { Box, Image, Text } from "@chakra-ui/react";
import SvgRedBasket from "../../../assets/svg/SvgRedBasket";

interface IElement {
  id: number;
  image?: string;
  file?: File;
  title: string;
}

interface ICardProps {
  el: IElement;
  deleteImg: boolean;
  handleId: (id: number) => void;
}

export default function Card({ el, deleteImg, handleId }: ICardProps) {
  return (
    <Box maxW="372px" h="auto" mb="53px" mx="auto">
      <Box position="relative">
        <Image src={el.image} alt="exemple" w="100%" h="auto" mb="13px" />
        {deleteImg && (
          <Box
            w="20px"
            h="26px"
            pos="absolute"
            top="23px"
            right="11px"
            display="flex"
            justifyContent="end"
            onClick={() => handleId(el.id)}
          >
            <SvgRedBasket />
          </Box>
        )}
      </Box>
      <Text fontSize="12px" fontWeight="200" fontFamily="inter" color="white">
        {el.title}
      </Text>
    </Box>
  );
}
