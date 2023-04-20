// External dependencies
import { EditIcon } from "@chakra-ui/icons";
import { Box, Image, Text } from "@chakra-ui/react";

import SvgRedBasket from "../../../assets/svg/SvgRedBasket";
import SvgPdf from "../../../assets/svg/SvgPdf";
import { IGroupsTypes } from "../../Interface/redux-image/types/Types";
import { API_ADDRESS } from "../../../Api";

interface IElement {
  id: string;
  file_url?: string;
  text: string;
}

interface ICardProps {
  el: IElement;
  deleteImg: boolean;
  handleIdForDelete: (value: IGroupsTypes, id: string) => void;
  handleIdForChange: (value: IGroupsTypes, id: string) => void;
  object: IGroupsTypes;
}

export default function Card({
  el,
  deleteImg,
  handleIdForDelete,
  handleIdForChange,
  object,
}: ICardProps) {
  return (
    <Box maxW="372px" h="100%" mx="auto">
      <Box position="relative">
        {el.file_url?.slice(-3) === "png" ? (
          <Image
            src={`${API_ADDRESS?.substring(0, 34)}${el.file_url}`}
            alt="exemple"
            w="100%"
            h="237px"
            mb="13px"
            objectFit="cover"
          />
        ) : (
          <a
            href={`${API_ADDRESS?.substring(0, 34)}${el.file_url}`}
            target="_blank"
          >
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
            rounded="50%"
            bg="black"
            w="30px"
            h="30px"
            pos="absolute"
            top="23px"
            right="11px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={() => handleIdForDelete(object, el.id)}
          >
            <SvgRedBasket />
          </Box>
        )}

        {deleteImg && (
          <Box
            rounded="50%"
            bg="black"
            w="30px"
            h="30px"
            pos="absolute"
            top="23px"
            left="11px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={() => handleIdForChange(object, el.id)}
          >
            <EditIcon color="white" />
          </Box>
        )}
      </Box>
      <Text fontSize="12px" fontWeight="200" fontFamily="inter" color="white">
        {el.text}
      </Text>
    </Box>
  );
}
