// External dependencies
import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

/* Local dependencies */
import SvgAkte from "../../../assets/svg/SvgAkte";
import SvgPhone from "../../../assets/svg/SvgPhone";
import Registration from "../../Registration/Registration";

enum TabTypes {
  NOTFALL = "NOTFALL",
  AKTE = "AKTE",
}

interface ITabs {
  akte: JSX.Element;
  notfall: JSX.Element;
}

export default function Tabs({ akte, notfall }: ITabs) {
  const [isActive, setActive] = useState(TabTypes.NOTFALL);

  const isNotfall = isActive === TabTypes.NOTFALL;
  const isAkte = isActive === TabTypes.AKTE;

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
          pt="5px"
          boxShadow={"inset 0px 2px 2px rgba(31, 31, 31, 0.44)"}
          onClick={() => setActive(TabTypes.NOTFALL)}
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
          pt="5px"
          boxShadow={"inset 0px 2px 2px rgba(31, 31, 31, 0.44)"}
          onClick={() => setActive(TabTypes.AKTE)}
          borderBottom={isAkte ? "0.5px solid white" : "0.5px solid black"}
        >
          <SvgAkte />
          <Text pt="4px" fontFamily="Calibri" fontSize="10px" fontWeight="300">
            Akte
          </Text>
        </Button>
      </Box>
      <Box maxW="900px" mx="auto" px="16px">
        {isNotfall ? notfall : akte}
      </Box>
      {/* <Registration /> */}
    </Box>
  );
}
