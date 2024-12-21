import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";

import SvgSuccess from "../../../assets/svg/SvgSuccess";
import { useAppSelector } from "../../../Hooks/Hooks";
import { useActionsForMessage } from "../../../Hooks/useActions";
import SvgKey from "../../../assets/svg/SvgKey";
import { Trans } from "react-i18next";
import "./style.scss";

export default function PopupForMessage() {
  const {
    ActionError,
    ActionReset,
    ActionUpload,
    ActionSuccess,
    ActionErrorMessenger,
  } = useActionsForMessage();
  const {
    success,
    error,
    reset_password,
    upload,
    errorMessenger,
    successMessenger,
  } = useAppSelector((state) => state.messageReducer);

  useEffect(() => {
    if (success || upload) {
      const timer = setTimeout(() => {
        ActionUpload(false);
        ActionSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, upload]);

  useEffect(() => {
    if (error || reset_password) {
      const timer = setTimeout(() => {
        ActionError(false);
        ActionReset(false);
        ActionUpload(false);
        ActionErrorMessenger("");
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [upload, reset_password, error]);

  const renderContent = () => {
    if (success) {
      return (
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            mb="15px"
            color="white"
            fontSize="15px"
            fontFamily="inter"
            textAlign="center"
          >
            <Trans>{successMessenger.title}</Trans>
          </Text>
          <Box mb="9px">
            <SvgSuccess />
          </Box>
          <Text
            color="white"
            fontSize="10px"
            fontWeight="300"
            fontFamily="inter"
          >
            <Trans>{successMessenger.desc}</Trans>
          </Text>
        </Box>
      );
    }

    if (reset_password) {
      return (
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            mb="16px"
            color="white"
            fontSize="15px"
            fontWeight="500"
            fontFamily="inter"
          >
            <Trans>resetYourPasword</Trans>
          </Text>
          <SvgKey />
          <Text
            mt="10px"
            color="white"
            fontSize="12px"
            fontWeight="200"
            fontFamily="inter"
            textAlign="center"
          >
            <Trans>descReset</Trans>
          </Text>
        </Box>
      );
    }

    if (upload) {
      return (
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            mb="15px"
            color="white"
            fontSize="15px"
            fontWeight="400"
            fontFamily="inter"
            textAlign="center"
          >
            <Trans>done</Trans>
          </Text>
          <Box>
            <SvgSuccess />
          </Box>
        </Box>
      );
    }

    if (error) {
      return (
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            color="white"
            fontSize="15px"
            fontWeight="400"
            textAlign="center"
            fontFamily="inter"
          >
            <Trans>{errorMessenger}</Trans>
          </Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <>
      <Box
        w="100%"
        zIndex="5"
        minH="100vh"
        className={`bg--popup ${
          success || error || reset_password || upload ? "active" : ""
        }`}
      />
      <Box
        w={{ base: "100%", md: "600px" }}
        left="0"
        right="0"
        h="100vh"
        zIndex="6"
        pos="fixed"
        display="flex"
        alignItems="center"
        justifyContent="center"
        className={`popupMessage ${
          success || error || reset_password || upload ? "transform" : ""
        }`}
      >
        <Box
          w={{ base: "100%", md: "500px" }}
          px="8px"
          h="151px"
          rounded="12px"
          bg="thirdlittleGray"
          boxShadow="0px 4px 4px rgba(20, 20, 20, 0.25), 0px 4px 4px #000000"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          {renderContent()}
        </Box>
      </Box>
    </>
  );
}
