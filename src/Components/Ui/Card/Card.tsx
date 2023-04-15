// External dependencies
import { Box, Image, Text } from "@chakra-ui/react";

import SvgRedBasket from "../../../assets/svg/SvgRedBasket";
import Exemple from "../../../assets/Image/Exemple.png";
import { IGroupsTypes } from "../../Interface/redux-image/types/Types";

interface IElement {
  id?: string;
  file_url?: string;
  text: string;
}

interface ICardProps {
  el: IElement;
  deleteImg: boolean;
  handleId: (value: IGroupsTypes, id?: string) => void;
  object: IGroupsTypes;
}

export default function Card({ el, deleteImg, handleId, object }: ICardProps) {
  return (
    <Box maxW="372px" h="auto" mb="53px" mx="auto">
      <Box position="relative">
        <Image src={Exemple} alt="exemple" w="100%" h="auto" mb="13px" />
        {deleteImg && (
          <Box
            w="20px"
            h="26px"
            pos="absolute"
            top="23px"
            right="11px"
            display="flex"
            justifyContent="end"
            onClick={() => handleId(object, el.id)}
          >
            <SvgRedBasket />
          </Box>
        )}
      </Box>
      <Text fontSize="12px" fontWeight="200" fontFamily="inter" color="white">
        {el.text}
      </Text>
    </Box>
  );
}
