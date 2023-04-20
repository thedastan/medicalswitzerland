import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";

import SvgSuccess from "../../../assets/svg/SvgSuccess";
import { useAppSelector } from "../../../Hooks/Hooks";
import { useActionsForMessage } from "../../../Hooks/useActions";
import "./style.scss";
import SvgKey from "../../../assets/svg/SvgKey";

export default function PopupForMessage() {
  const { ActionSuccess, ActionError, ActionReset, ActionUpload } =
    useActionsForMessage();
  const { success, error, reset_password, upload } = useAppSelector(
    (state) => state.messageReducer
  );

  useEffect(() => {
    setTimeout(() => {
      ActionSuccess(false);
      ActionError(false);
      ActionReset(false);
      ActionUpload(false);
    }, 3000);
  }, [success, upload, reset_password, error]);

  return (
    <>
      <Box
        zIndex="5"
        className={`bg--popup ${
          success || error || reset_password || upload ? "active" : ""
        }`}
        w="100%"
        minH="100vh"
      ></Box>
      <Box
        zIndex="6"
        h="100vh"
        left="0"
        right="0"
        className={`popupMessage ${
          success || error || reset_password || upload ? "transform" : ""
        }`}
        pos="fixed"
        pt="20px"
        px="10px"
      >
        <Box
          bg="thirdlittleGray"
          h="151px"
          rounded="12px"
          boxShadow="0px 4px 4px rgba(20, 20, 20, 0.25), 0px 4px 4px #000000"
        >
          <Box
            className="popup"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            h="151px"
          >
            {success && (
              <Box
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  color="white"
                  textAlign="center"
                  mb="15px"
                  fontSize="15px"
                  fontFamily="inter"
                >
                  Than you
                </Text>
                <Box mb="9px">
                  <SvgSuccess />
                </Box>
                <Text
                  color="white"
                  fontFamily="inter"
                  fontSize="10px"
                  fontWeight="300"
                >
                  Registration success
                </Text>
              </Box>
            )}
            {reset_password && (
              <Box
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  color="white"
                  fontFamily="inter"
                  fontSize="15px"
                  fontWeight="500"
                  mb="16px"
                >
                  Password Reset
                </Text>
                <SvgKey />
                <Text
                  mt="10px"
                  color="white"
                  fontFamily="inter"
                  fontSize="10px"
                  fontWeight="200"
                >
                  Password reset link sent to your registered Email
                </Text>
                <Text
                  color="white"
                  fontFamily="inter"
                  fontSize="10px"
                  fontWeight="200"
                >
                  Please check inbox or spam folder
                </Text>
              </Box>
            )}
            {upload && (
              <Box
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  color="white"
                  textAlign="center"
                  mb="15px"
                  fontSize="15px"
                  fontFamily="inter"
                  fontWeight="400"
                >
                  File Successfully Uploaded
                </Text>
                <Box>
                  <SvgSuccess />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
