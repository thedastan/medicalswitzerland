// External dependencies
import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

/* Local dependencies */
import SvgAkte from "../../../assets/svg/SvgAkte";
import SvgPhone from "../../../assets/svg/SvgPhone";
import Registration from "../../Registration/Registration";
import {
  useActionsAuth,
  useActionsForModal,
  useActionsUser,
} from "../../../Hooks/useActions";
import { useAppSelector } from "../../../Hooks/Hooks";
import { getAccessToken } from "../../Helpers";
import axios from "axios";
import { API_ADDRESS } from "../../../Api";

enum TabTypes {
  NOTFALL = "NOTFALL",
  AKTE = "AKTE",
}

interface ITabs {
  akte: JSX.Element;
  notfall: JSX.Element;
}

export default function Tabs({ akte, notfall }: ITabs) {
  const { ActionGetUser } = useActionsUser();
  const { ActionActiveIsAkte } = useActionsForModal();
  const { ActiveModalRegistration } = useActionsAuth();
  const { user } = useAppSelector((state) => state.userReducer);
  const { modal } = useAppSelector((state) => state.authReducer);

  const [isActive, setActive] = useState(TabTypes.NOTFALL);
  const [validToken, setValidToken] = useState<boolean>(true);

  const isNotfall = isActive === TabTypes.NOTFALL;
  const isAkte = isActive === TabTypes.AKTE;

  const handleActiveAuth = () => {
    if (user.is_first_time || !validToken) {
      ActiveModalRegistration(true);
    } else {
      setActive(TabTypes.AKTE);
      ActiveModalRegistration(false);
      ActionActiveIsAkte(true);
    }
  };

  const handleClickNotfall = () => {
    setActive(TabTypes.NOTFALL);
    ActionActiveIsAkte(false);
  };

  useEffect(() => {
    ActionGetUser(window.location.pathname.slice(6));
  }, []);

  useEffect(() => {
    axios
      .post(`${API_ADDRESS}users/auth/verify/`, { token: getAccessToken() })
      .then(() => {
        setValidToken(true);
      })
      .catch((e) => {
        setValidToken(false);
      });
  }, [modal]);

  return (
    <Box>
      <Box maxW="900px" mx="auto" display="flex" mb="24px">
        <Button
          bg="littleBlack"
          w="50%"
          textColor="white"
          display="flex"
          flexDir="column"
          h="53px"
          rounded="0px"
          position="static"
          pt="5px"
          boxShadow={"inset 0px 2px 2px rgba(31, 31, 31, 0.44)"}
          onClick={handleClickNotfall}
          borderBottom={isNotfall ? "0.5px solid white" : "0.5px solid black"}
        >
          <SvgPhone />
          <Text pt="4px" fontFamily="Calibri" fontSize="10px" fontWeight="300">
            Notfall
          </Text>
        </Button>
        <Button
          bg="littleBlack"
          w="50%"
          textColor="white"
          display="flex"
          flexDir="column"
          h="53px"
          rounded="0px"
          position="static"
          pt="5px"
          boxShadow={"inset 0px 2px 2px rgba(31, 31, 31, 0.44)"}
          onClick={handleActiveAuth}
          borderBottom={isAkte ? "0.5px solid white" : "0.5px solid black"}
        >
          <SvgAkte />
          <Text pt="4px" fontFamily="Calibri" fontSize="10px" fontWeight="300">
            Akte
          </Text>
        </Button>
      </Box>
      <Box maxW="900px" mx="auto">
        {isNotfall ? notfall : akte}
      </Box>
      {modal && <Registration />}
    </Box>
  );
}
