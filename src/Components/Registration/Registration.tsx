/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { motion, AnimatePresence } from "framer-motion";

/* Local dependencies */
import SvgClose from "../../assets/svg/SvgClose";
import "./style.scss";
import { useState } from "react";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";

export default function Registration() {
  const [dataPost, setDataPost] = useState({});
  const [login, setLogin] = useState(false);

  const listInput = [
    {
      placeholder: "Enter your email",
      name: "email",
      value: "",
    },
    {
      placeholder: "Mobile number",
      name: "number",
      value: "",
    },
    {
      placeholder: "Enter new password",
      name: "password",
      value: "",
    },
    {
      placeholder: "Confirm  password",
      name: "confirm",
      value: "",
    },
  ];

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        }}
        className={`modal-backdrop`}
        // onClick={() => setModal(false)}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          transition: {
            duration: 0.3,
          },
        }}
        className="modal--content"
        // onClick={() => setModal(false)}
      >
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              delay: 0.3,
              duration: 0.3,
            },
          }}
          onClick={(e) => e.stopPropagation()}
          className="modal--content__wrapper"
        >
          <Box bg="thirdlittleGray" h="266px" rounded="12px">
            <Box w="17px" h="17px" ml="auto" pr="25px" pt="4px">
              <SvgClose />
            </Box>
            {login ? (
              <>
                <Text
                  color="white"
                  fontSize="10px"
                  fontWeight="200"
                  textAlign="center"
                  fontFamily="inter"
                >
                  REGISTRATION
                </Text>

                <Box display="flex" flexDir="column">
                  {listInput.map((el) => (
                    <Box key={el.name} mb="3px" w="215px" mx="auto">
                      <Input
                        placeholder={el.placeholder}
                        fontSize="10px"
                        fontWeight="200"
                        textColor="#3C3C3C"
                        rounded="0px"
                        h="35px"
                        bg="#D9D9D9"
                        textAlign="center"
                      />
                    </Box>
                  ))}
                  <Box
                    display="flex"
                    alignItems="center"
                    w="215px"
                    ml="70px"
                    my="7px"
                  >
                    <Checkbox />
                    <Text
                      textColor="white"
                      fontSize="7px"
                      fontFamily="inter"
                      ml="5px"
                    >
                      save password
                    </Text>
                  </Box>
                  <Button
                    fontFamily="inter"
                    fontSize="10px"
                    w="215px"
                    h="34px"
                    bg="black"
                    textColor="white"
                    fontWeight="500"
                    border="1px solid white"
                    rounded="0px"
                    mx="auto"
                  >
                    Save
                  </Button>
                </Box>
              </>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignContent="center"
                mt="66px"
              >
                <Box mb="3px" w="215px" mx="auto">
                  <Input
                    placeholder="Enter new password"
                    fontSize="10px"
                    fontWeight="200"
                    textColor="#3C3C3C"
                    rounded="0px"
                    h="35px"
                    bg="#D9D9D9"
                    textAlign="center"
                    border="1px solid"
                  />
                  <Text
                    color="#2964FC"
                    fontSize="8px"
                    mb="8px"
                    textAlign="end"
                    fontFamily="inter"
                  >
                    Forgot password
                  </Text>
                  <Button
                    fontFamily="inter"
                    fontSize="10px"
                    w="215px"
                    h="34px"
                    bg="black"
                    textColor="white"
                    fontWeight="500"
                    border="1px solid white"
                    rounded="0px"
                    mx="auto"
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
