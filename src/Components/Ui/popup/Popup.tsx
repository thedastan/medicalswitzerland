/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { motion, AnimatePresence } from "framer-motion";

/* Local dependencies */
import "./style.scss";
import SvgClose from "../../../assets/svg/SvgClose";
import { useState } from "react";

interface IPopupProps {
  endpoind?: string;
  modal: boolean;
  setModal: (value: boolean) => void;
  value?: string;
}

export default function Popup({
  endpoind,
  modal,
  setModal,
  value,
}: IPopupProps) {
  const [success, setSuccess] = useState(false);

  console.log(success);

  return (
    <AnimatePresence>
      {modal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            className={`modal-backdrop`}
            onClick={() => setModal(false)}
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
            onClick={() => setModal(false)}
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
              <Box bg="thirdlittleGray" h="166px" rounded="12px">
                <Box
                  w="17px"
                  h="17px"
                  ml="auto"
                  pr="25px"
                  pt="4px"
                  mb="20px"
                  onClick={() => {
                    setModal(false);
                    setSuccess(false);
                  }}
                >
                  <SvgClose />
                </Box>
                {!success ? (
                  <>
                    <Text
                      color="#C7C4C4"
                      textAlign="center"
                      fontSize="18px"
                      pb="18px"
                    >
                      medical
                      <span style={{ color: "#E11F26" }}>switzerland</span>
                    </Text>
                    <Text
                      fontSize="12px"
                      fontFamily="inter"
                      mb="27px"
                      textAlign="center"
                      color="white"
                    >
                      Do you want to delete your medicalswitzerland {value} ?
                    </Text>
                    <Box>
                      <Button
                        bg="#121212"
                        w="50%"
                        roundedBottomLeft="12px"
                        roundedTop="0"
                        roundedRight="0"
                        fontSize="10px"
                        color="white"
                        _focus={{ bg: "#202020" }}
                        onClick={() => setSuccess(true)}
                      >
                        Yes
                      </Button>
                      <Button
                        bg="#121212"
                        w="50%"
                        roundedBottomRight="12px"
                        roundedTop="0"
                        roundedLeft="0"
                        fontSize="10px"
                        color="white"
                        _focus={{ bg: "#202020" }}
                        onClick={() => setModal(false)}
                      >
                        No
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Text
                    fontSize="12px"
                    fontFamily="inter"
                    mt="60px"
                    textAlign="center"
                    color="white"
                    onClick={() => setSuccess(!success)}
                  >
                    Your {value} has been successfully deleted
                  </Text>
                )}
              </Box>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
