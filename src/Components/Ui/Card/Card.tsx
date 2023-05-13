// External dependencies
import { Box, Image } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import { ComponentOptionsType as FancyboxOptionsType } from "@fancyapps/ui/types/Fancybox/options";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import SvgPdf from "../../../assets/svg/SvgPdf";
import SvgView from "../../../assets/svg/SvgView";
import { API_ADDRESS } from "../../../Api";
import "./style.scss";
import { tokenVerification } from "../../Helpers/action";
import { useAppSelector } from "../../../Hooks/Hooks";
interface IElement {
  id: string;
  file_url?: string;
  text: string;
}

interface ICardProps {
  el: IElement;
}

export default function Card({ el }: ICardProps) {
  const { user } = useAppSelector((state) => state.userReducer);

  const [blur, setBlur] = useState(true);
  const [validToken, setValidToken] = useState<boolean>(false);

  useEffect(() => {
    tokenVerification(setValidToken);
  }, []);

  return (
    <Box h="auto" w="100%">
      {el.file_url?.slice(-3) === "png" ? (
        <Box>
          <Image
            w="100%"
            h="auto"
            alt="exemple"
            objectFit="cover"
            src={`${API_ADDRESS?.substring(0, 34)}${el.file_url}`}
          />
          {user.guest_mode && !validToken && blur && (
            <Box
              top="0"
              left="0"
              right="0"
              bottom="-20px"
              display="flex"
              className={`image ${!blur && "active"}`}
              position="absolute"
              alignItems="center"
              justifyContent="center"
              bg="rgba(0, 0, 0, 0.2)"
              onClick={() => setBlur(!blur)}
            >
              <Box zIndex="11">
                <SvgView />
              </Box>
            </Box>
          )}
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
