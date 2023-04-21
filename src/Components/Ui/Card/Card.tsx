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
  object: IGroupsTypes;
}

export default function Card({ el, deleteImg, object }: ICardProps) {
  return (
    <Box h="auto">
      {el.file_url?.slice(-3) === "png" ? (
        <Image
          src={`${API_ADDRESS?.substring(0, 34)}${el.file_url}`}
          alt="exemple"
          w="100%"
          h="auto"
          objectFit="cover"
        />
      ) : (
        <a
          href={`${API_ADDRESS?.substring(0, 34)}${el.file_url}`}
          target="_blank"
        >
          <Box
            w="100%"
            h="auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <SvgPdf />
          </Box>
        </a>
      )}
    </Box>
  );
}
