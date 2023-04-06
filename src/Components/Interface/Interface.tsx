/* External dependencies */
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";

/* Local dependencies */
import Avatar from "../../assets/Image/Avatar.png";
import SvgProfile from "../../assets/svg/SvgProfile";
import SvgSubtract from "../../assets/svg/SvgSubtract";
import SvgMore from "../../assets/svg/SvgMore";
import PopupMediaFile from "./popup/PopupMediaFile";
import SvgDefaultAvatar from "../../assets/svg/SvgDefaultAvatar";

interface IInterfaceProps {
  children: JSX.Element;
}

export default function Interface({ children }: IInterfaceProps) {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState(false);
  const [subtract, setSubtract] = useState(false);

  const listNavigation = [
    {
      content: (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          pb="8px"
          pt="14px"
          onClick={() => {
            setModal(true);
            setProfile(true);
            setSubtract(false);
          }}
        >
          <SvgProfile />
          <Text color="white" pt="6px">
            Profil
          </Text>
        </Box>
      ),
    },
    {
      content: (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          pb="8px"
          pt="14px"
          onClick={() => {
            setModal(true);
            setSubtract(true);
            setProfile(false);
          }}
        >
          <SvgSubtract />
          <Text color="white" pt="6px">
            Hinzufugen
          </Text>
        </Box>
      ),
    },
    {
      content: (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          pb="8px"
          pt="14px"
        >
          <SvgMore />
          <Text color="white" pt="6px">
            More
          </Text>
        </Box>
      ),
    },
  ];

  return (
    <Box minH="100vh" w="100%" position="relative">
      <Box pt="40px" px="16px">
        <Box mx="auto" maxW="361px" minH="274px" bg="white" pt="80px">
          {Avatar ? (
            <>
              <Text
                color="#C7C4C4"
                textAlign="center"
                fontSize="22px"
                mb="20px"
              >
                medical
                <span style={{ color: "#E11F26" }}>switzerland</span>
              </Text>
              <Image src={Avatar} w="95px" h="95px" mx="auto" />
            </>
          ) : (
            <Box>
              <Text
                color="#C7C4C4"
                textAlign="center"
                fontSize="22px"
                mb="20px"
              >
                medical
                <span style={{ color: "#E11F26" }}>switzerland</span>
              </Text>
              <Box w="95px" h="95px" mx="auto" mb="10px">
                <SvgDefaultAvatar />
              </Box>
              <Box display="flex" justifyContent="center">
                <Button
                  bg="secondaryLittleGray"
                  fontSize="10px"
                  h="23px"
                  w="163px"
                  rounded="3px"
                  fontFamily="inter"
                  color="white"
                  fontWeight="200"
                  position="static"
                  onClick={() => ref.current?.click()}
                >
                  Edit profile image
                </Button>
                <input
                  style={{ display: "none" }}
                  ref={ref}
                  type="file"
                  accept="image/png,image/jpeg"
                />
              </Box>
            </Box>
          )}
        </Box>
        <Box>{children}</Box>
      </Box>
      <Box
        position="absolute"
        bg="black"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        boxShadow="2px 4px 4px 2px #FFFFFF"
        mb="auto"
        w="100%"
        bottom="0"
        left="0"
        right="0"
        px="31px"
      >
        {listNavigation.map((el, index) => (
          <div key={index}>{el.content}</div>
        ))}
      </Box>
      <PopupMediaFile
        modal={modal}
        setModal={setModal}
        profile={profile}
        subtract={subtract}
      />
    </Box>
  );
}
