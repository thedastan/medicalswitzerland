import axios from "axios";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

import SvgEye from "../../assets/svg/SvgEye";
import SvgEyePassword from "../../assets/svg/SvgEyePassword";
import { API_ADDRESS } from "../../Api";
import { useActionsForMessage } from "../../Hooks/useActions";
import { Trans } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function ResetPassword() {
  const language = localStorage.getItem("language") as string;

  const { ActionErrorMessenger, ActionError } = useActionsForMessage();
  const [eye, setEye] = useState({ password: false, confirm: false });
  const [isSuccess, setIsSuccess] = useState(false);

  const [dataPost, setDataPost] = useState({
    confirm: "",
    password: "",
  });
  const [validate, setValidate] = useState({
    confirm: false,
    password: false,
  });

  const navigateUser = `${API_ADDRESS}/user/${window.location.href.slice(-32)}`;

  function postResetUser() {
    if (dataPost.password) {
      if (dataPost.password === dataPost.confirm) {
        axios
          .post(`${API_ADDRESS}users/reset/${window.location.href.slice(44)}`, {
            password: dataPost.password,
          })
          .then(() => {
            window.location.reload();
            window.location.href = navigateUser;
            setIsSuccess(true);
          })
          .catch((e) => {
            ActionError(true);
            ActionErrorMessenger(e);
          });
      } else {
        setValidate({ ...validate, confirm: true });
      }
    } else {
      setValidate({ ...validate, password: true });
    }
  }
  // const res =
  //   "https://medicalswitzerland.vercel.app/reset?rpt=b14bfbd92789e57a904cd9cca69acea4&&uci=f997f3b7026256bb6b66605edf5a8795";
  // console.log(res.slice(44));
  // console.log(window.location.href.slice(28), "href");

  return (
    <>
      <Box
        minH="100vh"
        px="13px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="#272727"
      >
        {isSuccess ? (
          <NavLink
            to={`https://medicialswitzerland.vercel.app/user/${window.location.pathname.slice(
              -32
            )}`}
          >
            <Button
              h="50px"
              w="100%"
              border="1px solid #0B6CFF"
              rounded="4px"
              fontFamily="inter"
              fontWeight="700"
              fontSize="15px"
              bg="#0B6CFF"
              textColor="white"
              onClick={postResetUser}
            >
              Go to home
            </Button>
          </NavLink>
        ) : (
          <Box color="white" mb="150px" w="300px" mx="auto">
            <Text
              mb="19px"
              fontFamily="inter"
              fontSize="15px"
              fontWeight="200"
              textAlign="center"
            >
              CREATE NEW PASSWORD
            </Text>
            <Box mb="6px" pos="relative">
              <Input
                value={dataPost.password}
                placeholder={`${
                  language === "de" ? "Neues Kennwort" : "New password"
                }`}
                textAlign="center"
                fontSize="15px"
                fontWeight="200"
                textColor="white"
                rounded="4px"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                h="50px"
                bg="#303030"
                type={eye.password ? "text" : "password"}
                border={
                  validate.password ? "1px solid red" : "1px solid #303030"
                }
                onChange={(e) =>
                  setDataPost({ ...dataPost, password: e.target.value })
                }
              />
              <Box
                pos="absolute"
                zIndex="8"
                right="12px"
                top="0"
                bottom="0"
                display="flex"
                alignItems="center"
                cursor="pointer"
                onClick={() => setEye({ ...eye, password: !eye.password })}
              >
                {eye.password ? <SvgEye /> : <SvgEyePassword />}
              </Box>
            </Box>
            <Box mb="19px" pos="relative">
              <Input
                value={dataPost.confirm}
                placeholder={`${
                  language === "de"
                    ? "Bestätige das Passwort"
                    : "Confirm password"
                }`}
                textAlign="center"
                fontSize="15px"
                fontWeight="200"
                textColor="white"
                rounded="4px"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                h="50px"
                bg="#303030"
                border={
                  validate.confirm ? "1px solid red" : "1px solid #303030"
                }
                type={eye.confirm ? "text" : "password"}
                onChange={(e) =>
                  setDataPost({ ...dataPost, confirm: e.target.value })
                }
              />
              <Box
                pos="absolute"
                zIndex="8"
                right="12px"
                top="0"
                bottom="0"
                display="flex"
                alignItems="center"
                cursor="pointer"
                onClick={() => setEye({ ...eye, confirm: !eye.confirm })}
              >
                {eye.confirm ? <SvgEye /> : <SvgEyePassword />}
              </Box>
              {validate.password && (
                <Text
                  fontSize="8px"
                  fontFamily="inter"
                  fontWeight="300"
                  color="#FF0000"
                >
                  <Trans>fieldPasswordRequired</Trans>
                </Text>
              )}
              {validate.confirm && (
                <Text
                  fontSize="8px"
                  fontFamily="inter"
                  fontWeight="300"
                  color="#FF0000"
                >
                  <Trans>passwordsMustMatch</Trans>
                </Text>
              )}
            </Box>
            <Button
              h="50px"
              w="100%"
              border="1px solid #0B6CFF"
              rounded="4px"
              fontFamily="inter"
              fontWeight="700"
              fontSize="15px"
              bg="#0B6CFF"
              onClick={postResetUser}
            >
              <Trans>create</Trans>
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
