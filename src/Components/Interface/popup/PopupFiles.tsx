/* External dependencies */
import { Box, Container, Text } from "@chakra-ui/layout";
import { Button, Checkbox, Input } from "@chakra-ui/react";
import API from "../../../Api";

/* Local dependencies */
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import { useEffect, useState } from "react";
import { useActionsFile } from "../../../Hooks/useActions";
import { ActionFilesId } from "./redux-for-id/action/Action";

enum PopupFilesTypes {
  ADDED = "ADDED",
  FORCONSIDERATION = "FORCONSIDERATION",
}

interface IPopupFilesProps {
  setModal: (value: boolean) => void;
  setModalSecondary: (value: boolean) => void;
  modal: boolean;
}

export default function PopupFiles({
  modal,
  setModal,
  setModalSecondary,
}: IPopupFilesProps) {
  const dispatch = useAppDispatch();

  const { ActionAllGroups } = useActionsFile();
  const { allGroups } = useAppSelector((state) => state.filesReducer);

  const [active, setActive] = useState(PopupFilesTypes.FORCONSIDERATION);
  const [title, setTitle] = useState("");
  const [isAkte, setIsAkte] = useState(false);

  const isAdded = active === PopupFilesTypes.ADDED;
  const isConsideration = active === PopupFilesTypes.FORCONSIDERATION;

  const handleClick = (id: string) => {
    dispatch(ActionFilesId(id));
    setModal(false);
    setModalSecondary(true);
  };

  const addedGroupsForFile = async () => {
    try {
      const response = await API.post("groups/", {
        title: title,
        is_akte: isAkte,
      });
      const data = response.data;
      dispatch(ActionFilesId(data.id));
      setModal(false);
      setModalSecondary(true);
      alert("Success");
    } catch (e) {
      alert("Error");
    }
  };

  useEffect(() => {
    ActionAllGroups();
  }, []);

  return (
    <Box
      pos="fixed"
      top="0"
      bottom="0"
      left="0"
      right="0"
      bg="rgba(0, 0, 0, 0.6)"
      display="flex"
      flexDir="column"
      justifyContent="end"
      alignItems="end"
      onClick={() => setModal(false)}
    >
      <Box bg="#171717" mb="10px" w="100%" onClick={(e) => e.stopPropagation()}>
        <Box maxW="500px" mx="auto" mb="10px">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            px="10px"
            mx="auto"
            bg="white"
            fontSize="16px"
          />
        </Box>
        <Box display="flex" justifyContent="space-evenly" mb="50px">
          <Box display="flex">
            <Checkbox onClick={() => setIsAkte(false)} />
            <Text color="white" fontSize="14px" ml="10px">
              Notfall
            </Text>
          </Box>
          <Box display="flex">
            <Checkbox onClick={() => setIsAkte(true)} />
            <Text color="white" fontSize="14px" ml="10px">
              Akte
            </Text>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-evenly">
          <Button
            textColor="white"
            bg="#ff3a22"
            fontSize="10px"
            fontWeight="500"
            w="80px"
            h="30px"
            textTransform="uppercase"
          >
            Cencel
          </Button>
          <Button
            fontSize="10px"
            fontWeight="500"
            w="80px"
            h="30px"
            color="white"
            bg="whatsapp.500"
            textTransform="uppercase"
            onClick={addedGroupsForFile}
          >
            Added
          </Button>
        </Box>
      </Box>
      <Box bg="#171717" w="100%" py="50px">
        <Container maxW="500px">
          <Box w="70px" h="70px" rounded="4px" mx="auto" bg="black">
            <Text
              color="white"
              fontSize="50"
              fontWeight="700"
              textAlign="center"
              cursor="pointer"
            >
              +
            </Text>
          </Box>
          <Box display="flex" justifyContent="space-between" flexWrap="wrap">
            {allGroups.map((item, index) => (
              <Box
                key={index}
                color="white"
                fontSize="16px"
                fontFamily="inter"
                onClick={() => handleClick(item?.id)}
              >
                {item.title}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
