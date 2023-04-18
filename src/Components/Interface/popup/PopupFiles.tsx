/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/* Local dependencies */
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { ActionFilesId } from "./redux-for-modal/action/Action";
import { useActionsFile, useActionsForModal } from "../../../Hooks/useActions";

import API from "../../../Api";
import "./style.css";
import SvgClose from "../../../assets/svg/SvgClose";
import SvgRedBasket from "../../../assets/svg/SvgRedBasket";

interface IPopupFilesProps {
  setModal: (value: boolean) => void;
  modal: boolean;
}

export default function PopupFiles({ setModal }: IPopupFilesProps) {
  const dispatch = useAppDispatch();
  const { ActionAllGroups } = useActionsFile();
  const { ActionActiveModalMedia } = useActionsForModal();
  const { isAkte } = useAppSelector((state) => state.idReducer);
  const { loading, allGroups } = useAppSelector((state) => state.filesReducer);

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

  useEffect(() => {
    ActionAllGroups();
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
          <Box
            bg="#202020"
            w="100%"
            minH="40vh"
            rounded="12px"
            display="flex"
            alignItems="center"
            flexDir="column"
            onClick={(e) => e.stopPropagation()}
          >
            <Box
              w="20px"
              h="20px"
              ml="auto"
              mt="9px"
              mr="8px"
              onClick={handleCloseModal}
            >
              <SvgClose />
            </Box>
            <Box w="100%" mt="auto" px="13px">
              <Box maxH="200px" mb="48px" overflowY="auto">
                {allGroups.map((el, index) => (
                  <Box
                    key={index}
                    bg="#313131"
                    w="100%"
                    h="36px"
                    display="flex"
                    alignItems="center"
                    rounded="3px"
                    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                    mb="4px"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      w="100%"
                      pl="20px"
                    >
                      <Text
                        color="white"
                        fontSize="12px"
                        fontWeight="300"
                        fontFamily="inter"
                        textAlign="center"
                      >
                        {el.title}
                      </Text>
                    </Box>
                    <Box
                      ml="auto"
                      w="53px"
                      h="36px"
                      bg="#585858"
                      roundedRight="3px"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <SvgRedBasket />
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box maxW="500px" mx="auto" mb="27px">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  mx="auto"
                  bg="white"
                  color="#323232"
                  placeholder="Enter new group name"
                  textAlign="center"
                  h="36px"
                  fontSize="12px"
                  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                  rounded="3px"
                  fontWeight="300"
                  mb="13px"
                />
                <Button
                  fontSize="10px"
                  fontWeight="500"
                  w="100%"
                  h="36px"
                  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                  rounded="3px"
                  color="white"
                  bg="black"
                  textTransform="uppercase"
                  onClick={addedGroupsForFile}
                >
                  CREATE
                </Button>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
