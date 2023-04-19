import { Box, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import SvgClose from "../../assets/svg/SvgClose";
import SvgSuccess from "../../assets/svg/SvgSuccess";
import "./style.scss";

export default function PopupForm() {
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
        key={1}
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
        key={2}
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
          key={3}
        >
          <Box
            bg="thirdlittleGray"
            h="151px"
            rounded="12px"
            zIndex="6"
            boxShadow="0px 4px 4px rgba(20, 20, 20, 0.25), 0px 4px 4px #000000"
          >
            <Box
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              h="151px"
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
          </Box>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
