// External dependencies
import { Box, Image, Text } from "@chakra-ui/react";

import SvgRedBasket from "../../../assets/svg/SvgRedBasket";
import Exemple from "../../../assets/Image/Exemple.png";
import { IGroupsTypes } from "../../Interface/redux-image/types/Types";
import { API_ADDRESS } from "../../../Api";
import SvgPdf from "../../../assets/svg/SvgPdf";

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
    <Box maxW="372px" h="100%" mb="53px" mx="auto">
      <Box position="relative">
        {el.file_url?.slice(-3) === "png" ? (
          <Image
            src={`${API_ADDRESS?.substring(0, 33)}${el.file_url}`}
            alt="exemple"
            w="100%"
            h="237px"
            mb="13px"
          />
        ) : (
          <a href={`${API_ADDRESS?.substring(0, 33)}${el.file_url}`}>
            <Box
              w="100%"
              h="237px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <SvgPdf />
            </Box>
          </a>
        )}

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
