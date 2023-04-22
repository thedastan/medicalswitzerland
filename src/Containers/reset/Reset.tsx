import axios from "axios";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

import SvgEye from "../../assets/svg/SvgEye";
import SvgEyePassword from "../../assets/svg/SvgEyePassword";
import { API_ADDRESS } from "../../Api";

export default function ResetPassword() {
  const [eye, setEye] = useState({ password: false, confirm: false });

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
            `${API_ADDRESS}users/reset/?${window.location.href.slice(44)}`,
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
              placeholder="New password"
              textAlign="center"
              color="#7C7575"
              fontSize="15px"
              fontWeight="200"
              textColor="#7C7575"
              rounded="4px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              h="50px"
              bg="#303030"
              type={eye.password ? "text" : "password"}
              border={validate.password ? "1px solid red" : "1px solid #303030"}
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
              textAlign="center"
              color="#7C7575"
              fontSize="15px"
              fontWeight="200"
              textColor="#7C7575"
              rounded="4px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              h="50px"
              bg="#303030"
              border={validate.confirm ? "1px solid red" : "1px solid #303030"}
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
            h="50px"
            w="100%"
            border="1px solid #0B6CFF"
            rounded="4px"
            fontFamily="inter"
            fontWeight="300"
            fontSize="20px"
            bg="#0B6CFF"
            onClick={postResetUser}
          >
            Erstellen
          </Button>
        </Box>
      </Box>
    </>
  );
}
