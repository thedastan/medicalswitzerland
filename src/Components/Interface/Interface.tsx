/* External dependencies */
import axios from "axios";
import { Box, Button, Image, Spinner, Text } from "@chakra-ui/react";
import { createRef, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

/* Local dependencies */
import SvgProfile from "../../assets/svg/SvgProfile";
import SvgSubtract from "../../assets/svg/SvgSubtract";
import PopupMediaFile from "./popup/PopupMediaFile";
import Registration from "../Registration/Registration";
import SVgContact from "../../assets/svg/SvgContact";
import SvgAdded from "../../assets/svg/SvgAdded";
import SvgDefaultAvatar from "../../assets/svg/SvgDefaultAvatar";
import API, { API_ADDRESS } from "../../Api";
import PopupMore from "./popup/PopupMore";

import { useAppSelector } from "../../Hooks/Hooks";
import {
  useActionsAuth,
  useActionsForModal,
  useActionsUser,
} from "../../Hooks/useActions";
import { dataURLtoFile, getAccessToken, onChangeImage } from "../Helpers";
import PopupForMessage from "../Ui/popups/PopupForMessage";
import SvgExet from "../../assets/svg/SvgExit";
import { tokenVerification } from "../Helpers/action";
import { Trans } from "react-i18next";

interface IInterfaceProps {
  children: JSX.Element;
}

export default function Interface({ children }: IInterfaceProps) {
  const { ActionGetUser, ActionPutUser } = useActionsUser();
  const {
    ActionActiveSubtrac,
    ActionActiveProfile,
    ActionActiveModalMedia,
    ActionFilesId,
  } = useActionsForModal();
  const { ActiveModalRegistration } = useActionsAuth();
  const { user } = useAppSelector((state) => state.userReducer);
  const { modal } = useAppSelector((state) => state.authReducer);
  const { subtract, more, profile } = useAppSelector(
    (state) => state.modalReducer
  );

  const { id } = useParams<string>();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const cropperRef = createRef<ReactCropperElement>();

  const [popupMore, setPopupMore] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [cropData, setCropData] = useState("");
  const [validToken, setValidToken] = useState<boolean>(false);

  const handleActiveAuth = () => {
    if (user.is_first_time && !validToken) {
      ActiveModalRegistration(true);
    } else if (!user.is_first_time && !validToken) {
      ActiveModalRegistration(true);
    } else {
      ActiveModalRegistration(false);
      ActionActiveModalMedia(true);
      ActionActiveProfile(false);
      ActionActiveSubtrac(true);
    }
  };

  const handleClickModalMore = () => {
    setPopupMore(true);
  };

  const handleClickModalProfile = () => {
    if (validToken) {
      ActionFilesId("");
      ActionActiveProfile(true);
      ActionActiveSubtrac(false);
      ActionActiveModalMedia(true);
    } else {
      ActiveModalRegistration(true);
    }
  };

  const handleActiveAuthAvatart = () => {
    if (!user.is_first_time && validToken) {
      ActiveModalRegistration(false);
      ref.current?.click();
    } else {
      ActiveModalRegistration(true);
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
          ActionPutUser(window.location.pathname.slice(6), {
            allergies: user.allergies,
            allergies_text: user.allergies_text,
            avatar: data?.path.slice(6) || user.avatar,
            birth_date: user.birth_date || null,
            card_id: user.card_id,
            contact: user.contact || "",
            email: user.email,
            emergency_contact: user.emergency_contact || "",
            location: user.location || "",
            medications: user.medications,
            operation: user.operation,
            particularities: user.particularities,
            profession: user.profession,
            username: user.username || "",
            full_name: user.full_name || "",
            why_diagnose: user.why_diagnose,
            guest_mode: false,
          });
          setImageFile("");
          setCropData("");
          ActionGetUser(id);
        }
      })
      .catch((e) => {
        alert("Error!!!");
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
          fontFamily="inter"
          mb="8px"
          mt="-14px"
          cursor="pointer"
          fontSize="10px"
          fontWeight="300"
          onClick={handleClickModalProfile}
        >
          <SvgProfile />
          <Text color="white" pt="6px">
            <Trans>profile</Trans>
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
          fontFamily="inter"
          mb="8px"
          mt="-14px"
          cursor="pointer"
          fontSize="10"
          fontWeight="300"
          onClick={handleActiveAuth}
        >
          <SvgSubtract />
          <Text color="white" pt="6px">
            <Trans>add</Trans>
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
          fontFamily="inter"
          mb="8px"
          mt="-14px"
          cursor="pointer"
          fontSize="10"
          fontWeight="300"
          onClick={handleClickModalMore}
        >
          <SVgContact />
          <Text color="white">
            <Trans>contact</Trans>
          </Text>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    ActionGetUser(id);
  }, [subtract, profile, more]);

  useEffect(() => {
    tokenVerification(setValidToken);
  }, []);

  return (
    <Box minH="100vh" w="100%" position="relative">
      <PopupForMessage />
      <input
        style={{ display: "none" }}
        ref={ref}
        type="file"
        accept="image/png,image/jpeg"
        onChange={(e) => onChangeImage(e, setImageFile)}
      />
      <Box pt="40px" px="16px">
        <Box mx="auto" maxW="361px" minH="274px" bg="white" pt="80px">
          {user?.avatar ? (
            <>
              <Text
                color="#C7C4C4"
                textAlign="center"
                fontSize="30px"
                h="30px"
                mb="20px"
              >
                medical
                <span style={{ color: "#E11F26" }}>switzerland</span>
              </Text>
              <Box pos="relative" zIndex="2" w="100px" h="100px" mx="auto">
                <Image
                  src={`${API_ADDRESS?.substring(0, 35)}${user.avatar.slice(
                    1
                  )}`}
                  alt="avatar"
                  w="100px"
                  h="100px"
                  mx="auto"
                  rounded="50%"
                  objectFit="cover"
                />
                {validToken && (
                  <Box
                    pos="absolute"
                    top="10px"
                    right="-9px"
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
                fontSize="30px"
                h="30px"
                mb="20px"
              >
                medical
                <span style={{ color: "#E11F26" }}>switzerland</span>
              </Text>
              <Box
                w="100px"
                h="100px"
                zIndex="2"
                mx="auto"
                mb="10px"
                pos="relative"
              >
                <SvgDefaultAvatar />
                <Box
                  pos="absolute"
                  top="10px"
                  right="-9px"
                  cursor="pointer"
                  onClick={handleActiveAuthAvatart}
                >
                  <SvgAdded />
                </Box>
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
        h="94px"
        bottom="0"
        left="0"
        right="0"
        px="31px"
      >
        {listNavigation.map((el, index) => (
          <div key={index}>{el.content}</div>
        ))}
      </Box>
      {/* {popup && <PopupFiles modal={popup} setModal={setPopup} />} */}
      {popupMore && <PopupMore setModal={setPopupMore} />}
      {modal && <Registration />}
      {imageFile && (
        <Box
          pos="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="black"
          zIndex="10"
        >
          {imageFile && (
            <Box>
              <Box
                maxW="372px"
                mx="auto"
                mt="19px"
                mb="30px"
                onClick={() => {
                  setImageFile("");
                  setCropData("");
                }}
              >
                <Box w="30px" h="30px">
                  <SvgExet />
                </Box>
              </Box>
              <Box
                mt="30%"
                zIndex="11"
                maxW="372px"
                mx="auto"
                display="flex"
                minH="100vh"
                justifyContent="center"
                alignItems="start"
                px="13px"
              >
                <Box w="100%" mx="auto">
                  {cropData ? (
                    <Box w="95px" h="95px" mx="auto">
                      <Image
                        src={cropData}
                        w="95px"
                        h="95px"
                        objectFit="cover"
                        rounded="50%"
                      />
                    </Box>
                  ) : (
                    <Box
                      h="180px"
                      pos="relative"
                      w="100%"
                      display="flex"
                      justifyContent="center"
                    >
                      <Cropper
                        ref={cropperRef}
                        src={imageFile}
                        minCropBoxWidth={150}
                        minCropBoxHeight={150}
                        minCanvasWidth={150}
                        minCanvasHeight={150}
                        style={{ width: "150px", height: "150px" }}
                      />
                    </Box>
                  )}
                  <Box
                    maxW="500px"
                    display="flex"
                    justifyContent="space-between"
                    mx="auto"
                    gap="2px"
                    mt="20px"
                  >
                    <Button
                      textColor="white"
                      bg="#0B6CFF"
                      fontSize="16px"
                      fontWeight="600"
                      w="100%"
                      h="35px"
                      rounded="7px"
                      onClick={distributionFunction}
                    >
                      {!cropData ? "Crop Avatar" : "Save Avatar"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
      <PopupMediaFile />
    </Box>
  );
}
