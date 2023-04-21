import axios from "axios";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

import SvgEye from "../../assets/svg/SvgEye";
import SvgEyePassword from "../../assets/svg/SvgEyePassword";
import { API_ADDRESS } from "../../Api";

export default function ResetPassword() {
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

  const navigateUser = `${window.location.hostname}:${
    window.location.port
  }/user/${window.location.href.slice(-32)}`;

  function postResetUser() {
    if (dataPost.password) {
      if (dataPost.password === dataPost.confirm) {
        alert("Post");
        axios
          .post(
            `${API_ADDRESS}users/reset/?${window.location.href.slice(28)}`,
            {
              password: dataPost.password,
            }
          )
          .then(() => {
            alert("Success");
            window.location.href = navigateUser;
          })
          .catch(() => {
            alert("Error");
          });
      } else {
        setValidate({ ...validate, confirm: true });
      }
    } else {
      setValidate({ ...validate, password: true });
    }
  }

  return (
    <>
      {isSuccess && <></>}
      <Box
        minH="100vh"
        px="13px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box color="white" mb="300px" w="215px" mx="auto">
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
              placeholder="New password"
              fontSize="10px"
              fontWeight="200"
              textColor="#3C3C3C"
              rounded="0px"
              h="35px"
              bg="#D9D9D9"
              textAlign="center"
              type={eye.password ? "text" : "password"}
              border={validate.password ? "1px solid red" : "1px solid"}
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
              placeholder="Confirm password"
              fontSize="10px"
              fontWeight="200"
              textColor="#3C3C3C"
              rounded="0px"
              h="35px"
              bg="#D9D9D9"
              textAlign="center"
              border={validate.confirm ? "1px solid red" : "1px solid"}
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
                Field password required
              </Text>
            )}
            {validate.confirm && (
              <Text
                fontSize="8px"
                fontFamily="inter"
                fontWeight="300"
                color="#FF0000"
              >
                passwords must match
              </Text>
            )}
          </Box>
          <Button
            h="34px"
            w="100%"
            border="1px solid #C2C2C2"
            rounded="0px"
            fontFamily="inter"
            fontWeight="500"
            fontSize="10px"
            onClick={postResetUser}
          >
            CREATE
          </Button>
        </Box>
      </Box>
    </>
  );
}
