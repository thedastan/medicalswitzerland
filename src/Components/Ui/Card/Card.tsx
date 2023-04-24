// External dependencies
import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";

import SvgPdf from "../../../assets/svg/SvgPdf";
import SvgView from "../../../assets/svg/SvgView";
import { API_ADDRESS } from "../../../Api";
import "./style.scss";

interface IElement {
  id: string;
  file_url?: string;
  text: string;
}

interface ICardProps {
  el: IElement;
}

export default function Card({ el }: ICardProps) {
  const [blur, setBlur] = useState(true);

  return (
    <Box h="auto">
      {el.file_url?.slice(-3) === "png" ? (
        <Box>
          <Image
            w="100%"
            h="auto"
            alt="exemple"
            objectFit="cover"
            src={`${API_ADDRESS?.substring(0, 34)}${el.file_url}`}
          />
          <Box
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            className={`image ${!blur && "active"}`}
            position="absolute"
            alignItems="center"
            justifyContent="center"
            bg="rgba(0, 0, 0, 0.8)"
            onClick={() => setBlur(!blur)}
          >
            <Box zIndex="11">
              <SvgView />
            </Box>
          </Box>
        </Box>
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
