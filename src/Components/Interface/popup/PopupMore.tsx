/* External dependencies */
import { Box, Image, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import Medical from "../../../assets/Image/Medical.png";
import Map from "../../../assets/Image/Map.png";
import "./style.css";

import { useActionsUser } from "../../../Hooks/useActions";

interface IPopupMoreProps {
  setModal: (value: boolean) => void;
}

export default function PopupMore({ setModal }: IPopupMoreProps) {
  const { ActionGetUser } = useActionsUser();
  const handleCloseModal = () => {
    setModal(false);
  };
  const { t } = useTranslation();

  useEffect(() => {
    ActionGetUser(window.location.pathname.slice(6));
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key={1}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        }}
        className={`modal-backdrop`}
        onClick={handleCloseModal}
      />
      <motion.div
        key={2}
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          transition: {
            duration: 0.3,
          },
        }}
        className="modal-content-wrapper"
        onClick={handleCloseModal}
      >
        <motion.div
          key={3}
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
          className="modal-content"
        >
          <Box roundedTop="10px" bg="white">
            <Box w="100%" position="relative">
              <Image
                src={Medical}
                w="100%"
                objectFit="cover"
                h="217px"
                roundedTop="10px"
              />
              <div
                style={{
                  position: "absolute",
                  border: "3px solid #F6F4F4",
                  width: "200px",
                  height: "170px",
                  bottom: "32px",
                  right: "20px",
                }}
              />
              <Text
                position="absolute"
                fontSize="22px"
                textAlign="center"
                right="7px"
                bottom="-14px"
                p="10px 20px"
                border="3px solid #F6F4F4 "
              >
                <Trans>yourPersonalClinics</Trans>
              </Text>
            </Box>
            <Box
              px="13px"
              py="18px"
              display="flex"
              justifyContent="space-between"
            >
              <Box w="45%">
                <Text fontSize="22px" textColor="middleGray" h="25px" pt="10px">
                  medical
                </Text>
                <Text fontSize="22px" color="red" mb="6px" w="190%" pt="15px">
                  switzerland
                </Text>

              </Box>
              <Box w="53%">
                <Box mb="13px">
                  <Image src={Map} w="93%" ml="auto" objectFit="cover" />
                </Box>
                <Box
                  mx="auto"
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                </Box>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
