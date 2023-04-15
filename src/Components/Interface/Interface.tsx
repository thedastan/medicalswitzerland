/* External dependencies */
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { createRef, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

/* Local dependencies */
import SvgProfile from "../../assets/svg/SvgProfile";
import SvgSubtract from "../../assets/svg/SvgSubtract";
import SvgMore from "../../assets/svg/SvgMore";
import PopupMediaFile from "./popup/PopupMediaFile";
import Registration from "../Registration/Registration";
import SvgDefaultAvatar from "../../assets/svg/SvgDefaultAvatar";
import PopupFiles from "./popup/PopupFiles";
import API, { API_ADDRESS } from "../../Api";

import { useAppSelector } from "../../Hooks/Hooks";
import {
  useActionsAuth,
  useActionsForModal,
  useActionsUser,
} from "../../Hooks/useActions";
import { dataURLtoFile, getAccessToken, onChangeImage } from "../Helpers";
import SvgAdded from "../../assets/svg/SvgAdded";

interface IInterfaceProps {
  children: JSX.Element;
}

export default function Interface({ children }: IInterfaceProps) {
  const { ActionGetUser, ActionPutUser } = useActionsUser();
  const { ActionActiveSubtrac, ActionActiveProfile, ActionActiveModalMedia } =
    useActionsForModal();
  const { ActiveModalRegistration } = useActionsAuth();
  const { bearbeiten, user } = useAppSelector((state) => state.userReducer);
  const { modal } = useAppSelector((state) => state.authReducer);

  const { id } = useParams<string>();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const cropperRef = createRef<ReactCropperElement>();

  const [popup, setPopup] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [cropData, setCropData] = useState("");

  const handleActiveAuth = () => {
    if (user.is_first_time && !getAccessToken()) {
      ActiveModalRegistration(true);
    } else {
      ActiveModalRegistration(false);
      setPopup(true);
      ActionActiveModalMedia(false);
      ActionActiveSubtrac(true);
      ActionActiveProfile(false);
    }
  };

  const handleActiveAuthAvatart = () => {
    if (user.is_first_time && !getAccessToken()) {
      ActiveModalRegistration(true);
    } else {
      ActiveModalRegistration(false);
      ref.current?.click();
    }
  };

  const getCropData = async () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handlePostFiles = async () => {
    const image =
      cropData &&
      dataURLtoFile(cropData, `${Math.floor(Math.random() * 100000)}.png`);

    const formData = new FormData();
    formData.append("file", image);

    await API.post("users/upload/", formData)
      .then(({ data }) => {
        if (data) {
          ActionPutUser({
            allergies: user.allergies,
            allergies_text: user.allergies_text,
            avatar: data?.path.slice(6) || user.avatar,
            birth_date: user.birth_date,
            card_id: user.card_id,
            contact: user.contact || "",
            email: user.email,
            emergency_contact: user.emergency_contact || "",
            location: user.location || "",
            medications: user.medications,
            operation: user.operation,
            particularities: user.particularities,
            profession: user.profession,
            username: user.username,
            full_name: user.full_name,
            why_diagnose: user.why_diagnose,
          });
        }
      })
      .catch((e) => {
        alert("Error");
      });
  };

  const distributionFunction = async () => {
    if (!cropData) {
      await getCropData();
    } else {
      handlePostFiles();
    }
  };

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
            ActionActiveModalMedia(true);
            ActionActiveProfile(true);
            ActionActiveSubtrac(false);
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
          onClick={handleActiveAuth}
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
        <a href="https://www.medicalswitzerland.ch/" target="_blank">
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
        </a>
      ),
    },
  ];

  useEffect(() => {
    ActionGetUser(id);
  }, []);

  return (
    <Box minH="100vh" w="100%" position="relative">
      <input
        style={{ display: "none" }}
        ref={ref}
        type="file"
        accept="image/png,image/jpeg"
        onChange={(e) => onChangeImage(e, setImageFile)}
      />
      <Box pt="40px" px="16px">
        <Box mx="auto" maxW="361px" minH="274px" bg="white" pt="90px">
          {user?.avatar ? (
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
              <Box pos="relative" w="95px" h="95px" mx="auto">
                <Image
                  src={`${API_ADDRESS?.substring(0, 34)}${user.avatar.slice(
                    1
                  )}`}
                  alt="avatar"
                  w="95px"
                  h="95px"
                  mx="auto"
                  rounded="50%"
                />
                {!bearbeiten && (
                  <Box
                    pos="absolute"
                    top="8px"
                    right="-11px"
                    cursor="pointer"
                    onClick={handleActiveAuthAvatart}
                  >
                    <SvgAdded />
                  </Box>
                )}
              </Box>
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
                  onClick={handleActiveAuthAvatart}
                >
                  Edit profile image
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box pb="70px">{children}</Box>
      <Box
        position="fixed"
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
      {popup && <PopupFiles modal={popup} setModal={setPopup} />}
      <PopupMediaFile />
      {modal && <Registration />}
      {imageFile && (
        <Box pos="fixed" top="0" left="0" right="0" bottom="0" bg="black">
          {imageFile && (
            <Box
              display="flex"
              minH="100vh"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                {cropData ? (
                  <Image src={cropData} />
                ) : (
                  <Cropper
                    ref={cropperRef}
                    src={imageFile}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    responsive={true}
                  />
                )}

                <Box
                  display="flex"
                  w="100%"
                  justifyContent="space-evenly"
                  mt="50px"
                >
                  <Button
                    textColor="white"
                    bg="#ff3a22"
                    fontSize="10px"
                    fontWeight="500"
                    w="80px"
                    h="30px"
                    textTransform="uppercase"
                    onClick={() => {
                      setImageFile("");
                      setCropData("");
                    }}
                  >
                    Cencel
                  </Button>
                  <Button
                    textColor="white"
                    bg="whatsapp.500"
                    fontSize="10px"
                    fontWeight="500"
                    w="80px"
                    h="30px"
                    textTransform="uppercase"
                    onClick={distributionFunction}
                  >
                    {!cropData ? "Crop Avatart" : "Save Avatar"}
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
