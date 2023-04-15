/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* Local dependencies */
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { ActionFilesId } from "./redux-for-modal/action/Action";
import { useActionsForModal } from "../../../Hooks/useActions";

import API from "../../../Api";
import "./style.css";

interface IPopupFilesProps {
  setModal: (value: boolean) => void;
  modal: boolean;
}

export default function PopupFiles({ modal, setModal }: IPopupFilesProps) {
  const dispatch = useAppDispatch();
  const { ActionActiveModalMedia } = useActionsForModal();
  const { isAkte } = useAppSelector((state) => state.idReducer);

  const [title, setTitle] = useState("");

  const addedGroupsForFile = async () => {
    try {
      const response = await API.post("groups/", {
        title: title,
        is_akte: isAkte,
      });
      const data = response.data;
      dispatch(ActionFilesId(data.id));
      setModal(false);
      ActionActiveModalMedia(true);
    } catch (e) {
      alert(`${e} Error`);
    }
  };

  const handleCloseModal = () => {
    setModal(false);
    setTitle("");
  };

  return (
    <>
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
            <Box
              bg="thirdlittleGray"
              w="100%"
              minH="40vh"
              rounded="12px"
              display="flex"
              alignItems="center"
              flexDir="column"
              onClick={(e) => e.stopPropagation()}
            >
              <Text
                pl="10px"
                color="white"
                pt="20px"
                mb="50px"
                fontFamily="inter"
                fontSize="14px"
              >
                Geben Sie den Release-Namen ein
              </Text>
              <Box w="100%">
                <Box maxW="500px" mx="auto" mb="10px" px="20px">
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    mx="auto"
                    bg="white"
                    color="#323232"
                    placeholder="Veröffentlichungstitel..."
                    fontSize="14px"
                  />
                </Box>
                <Box
                  maxW="500px"
                  mx="auto"
                  display="flex"
                  justifyContent="space-between"
                  px="20px"
                  gap="10px"
                >
                  <Button
                    textColor="white"
                    bg="#ff3a22"
                    fontSize="10px"
                    fontWeight="500"
                    w="40vw"
                    h="35px"
                    textTransform="uppercase"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    fontSize="10px"
                    fontWeight="500"
                    w="40vw"
                    h="35px"
                    color="white"
                    bg="whatsapp.500"
                    textTransform="uppercase"
                    onClick={addedGroupsForFile}
                  >
                    Added
                  </Button>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
