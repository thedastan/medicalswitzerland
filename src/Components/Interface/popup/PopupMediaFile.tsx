/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { motion, AnimatePresence } from "framer-motion";
import { createRef, useEffect, useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import { Button, Image, Input, Select, Spinner } from "@chakra-ui/react";
import { Trans } from "react-i18next";
import "cropperjs/dist/cropper.css";

/* Local dependencies */
import SvgPhoneCall from "../../../assets/svg/SvgPhoneCall";
import SvgMail from "../../../assets/svg/SvgMail";
import SvgLocation from "../../../assets/svg/SvgLocation";
import SvgBasket from "../../../assets/svg/SvgBasket";
import SvgPdf from "../../../assets/svg/SvgPdf";
import i18n, { langs } from "../../../i18n/I18n";
import API from "../../../Api";
import Popup from "../../Ui/popup/Popup";
import "./style.css";

import { dataURLtoFile, getAccessToken, onChangeImage } from "../../Helpers";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hooks";
import {
  useActionsFile,
  useActionsForMessage,
  useActionsForModal,
} from "../../../Hooks/useActions";
import { InterfaceImageTypes } from "../redux-image/types/Types";
import SvgExet from "../../../assets/svg/SvgExit";
import SvgSignOut from "../../../assets/svg/SvgSignOut";
import SvgMore from "../../../assets/svg/SvgMore";

export default function PopupMediaFile() {
  const dispatch = useAppDispatch();
  const { ActionActiveModalMedia, ActionFilesId } = useActionsForModal();
  const { ActionUpload } = useActionsForMessage();
  const { ActionAllGroups } = useActionsFile();
  const { filesId, activeMediaModal, profile, subtract } = useAppSelector(
    (state) => state.idReducer
  );
  const { isAkte } = useAppSelector((state) => state.idReducer);
  const { user } = useAppSelector((state) => state.userReducer);

  const imageRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const cropperRef = createRef<ReactCropperElement>();

  const [accept, setAccept] = useState("");
  const [cropData, setCropData] = useState("");
  const [loader, setLoader] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [textVaildate, setTextValidate] = useState(false);
  const [titleValidate, setTitleValidate] = useState(false);
  const [validate, setValidate] = useState(false);
  const [renderMore, setRenderMore] = useState(false);

  const [openPopup, setOpenPopup] = useState(false);
  const [filePdf, setFilePdf] = useState<any>();
  const [pdfIncludes, setPdfIncludes] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");

  const handleClickForDeleteProfile = async () => {
    if (getAccessToken()) {
      setOpenPopup(true);
      ActionActiveModalMedia(false);
    }
  };

  const getCropData = () => {
    if (!title.length && !text.length) {
      setTextValidate(true);
      setTitleValidate(true);
    } else if (!title.length) {
      setTitleValidate(true);
    } else if (!text.length) {
      setTextValidate(true);
    } else {
      if (typeof cropperRef.current?.cropper !== "undefined") {
        setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        setValidate(true);
      }
    }

    if (filesId) {
      if (typeof cropperRef.current?.cropper !== "undefined") {
        setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        setRenderMore(true);
      }
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      setFilePdf(i);
      setPdfIncludes(true);
    }
  };

  const handlePostFiles = async () => {
    try {
      const response = await API.post("groups/", {
        title: title,
        is_akte: isAkte,
      });
      const dataGroup = response.data;

      const image = cropData
        ? dataURLtoFile(cropData, `${Math.floor(Math.random() * 100000)}.png`)
        : filePdf;
      const formData = new FormData();
      formData.append("file", image);

      if (dataGroup) {
        setLoader(true);
        dispatch({
          type: InterfaceImageTypes.USER_FILES_LOADER,
          payload: true,
        });
        await API.post("users/upload/", formData)
          .then(({ data }) => {
            if (data) {
              API.post(`groups/${dataGroup.id}/info/`, {
                text: text,
                file_url: data.path,
              })
                .then(() => {
                  dispatch({
                    type: InterfaceImageTypes.USER_FILES_LOADER,
                    payload: false,
                  });
                  ActionActiveModalMedia(false);
                  setTextValidate(false);
                  setPdfIncludes(false);
                  ActionUpload(true);
                  setLoader(false);
                  ActionAllGroups();
                  setImageFile("");
                  setCropData("");
                  setText("");
                })
                .catch(() => {
                  dispatch({
                    type: InterfaceImageTypes.USER_FILES_LOADER,
                    payload: false,
                  });
                  ActionActiveModalMedia(false);
                  setTextValidate(false);
                  setPdfIncludes(false);
                  setLoader(false);
                  ActionAllGroups();
                  setImageFile("");
                  setCropData("");
                  setText("");
                });
            }
          })
          .catch((e) => {
            alert(`${e} Error`);
            setLoader(false);
          });
      }
    } catch (e) {
      alert(`${e} Error`);
    }
  };

  const handlePostMoreFiles = async () => {
    const image = cropData
      ? dataURLtoFile(cropData, `${Math.floor(Math.random() * 100000)}.png`)
      : filePdf;
    const formData = new FormData();
    formData.append("file", image);

    if (text.length) {
      setLoader(true);
      dispatch({
        type: InterfaceImageTypes.USER_FILES_LOADER,
        payload: true,
      });
      await API.post("users/upload/", formData)
        .then(({ data }) => {
          if (data) {
            API.post(`groups/${filesId}/info/`, {
              text: text,
              file_url: data.path,
            })
              .then(() => {
                dispatch({
                  type: InterfaceImageTypes.USER_FILES_LOADER,
                  payload: false,
                });
                ActionActiveModalMedia(false);
                setTextValidate(false);
                setPdfIncludes(false);
                ActionUpload(true);
                setLoader(false);
                ActionAllGroups();
                ActionFilesId("");
                setImageFile("");
                setCropData("");
                setText("");
              })
              .catch(() => {
                dispatch({
                  type: InterfaceImageTypes.USER_FILES_LOADER,
                  payload: false,
                });
                ActionActiveModalMedia(false);
                setTextValidate(false);
                setPdfIncludes(false);
                setLoader(false);
                ActionAllGroups();
                setImageFile("");
                setCropData("");
                setText("");
              });
          }
        })
        .catch((e) => {
          alert(`${e} Error`);
          setLoader(false);
        });
    } else {
      setTextValidate(true);
    }
  };

  const handleCencelCrop = () => {
    setCropData("");
    setImageFile("");
    setText("");
    ActionActiveModalMedia(false);
  };

  const handleCloseModal = () => {
    ActionActiveModalMedia(false);
    setPdfIncludes(false);
    setText("");
  };

  const onChange = (event: string) => {
    localStorage.setItem("language", JSON.stringify(event));
    i18n.changeLanguage(event);
    setLanguage(event);
  };

  useEffect(() => {
    if (cropData) {
      handlePostFiles();
    }
  }, [validate]);

  useEffect(() => {
    if (filesId) {
      if (text.length) {
        handlePostMoreFiles();
      } else {
        setTextValidate(true);
      }
    }
  }, [renderMore]);

  const listProfile = [
    {
      content: user.emergency_contact && (
        <Box
          display="flex"
          alignItems="center"
          bg="#1F1F1F"
          textAlign="center"
          borderTopRadius="5px"
        >
          <Box
            w="18%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <SvgPhoneCall />
          </Box>
          <Box
            w="90%"
            mx="auto"
            h="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderBottom="1px solid #454545"
            pr="30"
          >
            <Text
              color="white"
              fontWeight="300"
              fontSize="13px"
              fontFamily="inter"
            >
              {user.emergency_contact}
            </Text>
          </Box>
        </Box>
      ),
    },
    {
      content: user.email && (
        <Box
          display="flex"
          alignItems="center"
          bg="#1F1F1F"
          textAlign="center"
          px="2px"
          borderTopRadius={!user.emergency_contact ? "5px" : "0px"}
          borderBottomRadius={!user.location ? "5px" : "0px"}
        >
          <Box
            w="18%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <SvgMail />
          </Box>
          <Box
            w="90%"
            mx="auto"
            h="50px"
            pr="30"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderBottom="1px solid #454545"
          >
            <Text
              color="white"
              fontWeight="300"
              fontSize="13px"
              fontFamily="inter"
            >
              {user.email}
            </Text>
          </Box>
        </Box>
      ),
    },
    {
      content: user.location && (
        <Box
          display="flex"
          alignItems="center"
          bg="#1F1F1F"
          borderBottomRadius="5px"
          textAlign="center"
        >
          <Box
            w="18%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <SvgLocation />
          </Box>
          <Box
            w="90%"
            mx="auto"
            h="50px"
            pr="30"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              color="white"
              fontWeight="300"
              fontSize="13px"
              fontFamily="inter"
            >
              {user.location}
            </Text>
          </Box>
        </Box>
      ),
    },
  ];

  if (loader) {
    return (
      <Box
        minH="100vh"
        bg="rgba(0, 0, 0, 0.6)"
        pos="fixed"
        top="0"
        bottom="0"
        left="0"
        right="0"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          bg="black"
          pb="30px"
          rounded="20px"
        >
          <Text mb="10px" color="white" pt="30px" px="20px">
            File is uploading...
          </Text>
          <Spinner color="white" />
        </Box>
      </Box>
    );
  }

  return (
    <AnimatePresence>
      {activeMediaModal && (
        <>
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
              {subtract && (
                <Box zIndex="6">
                  <Text
                    cursor="pointer"
                    color="#0F6FFF"
                    py="10px"
                    bg="thirdlittleGray"
                    textAlign="center"
                    roundedTop="7px"
                    onClick={() => {
                      setAccept("image/png, image/gif, image/jpeg");
                      imageRef.current?.click();
                    }}
                    fontFamily="inter"
                  >
                    Photo
                  </Text>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept={accept}
                    ref={imageRef}
                    onChange={(e) => onChangeImage(e, setImageFile)}
                  />
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="application / pdf, application / vnd.ms - excel"
                    ref={fileRef}
                    onChange={(e) => handleFile(e)}
                  />
                  <Text
                    cursor="pointer"
                    color="#0F6FFF"
                    py="10px"
                    bg="thirdlittleGray"
                    textAlign="center"
                    roundedBottom="7px"
                    onClick={() => {
                      fileRef.current?.click();
                    }}
                    fontFamily="inter"
                  >
                    PDF file
                  </Text>
                </Box>
              )}
              {profile && (
                <Box px="29px" bg="#171717" pt="58px" pb="44px" rounded="10px">
                  <Box zIndex="6" mb="19px">
                    {listProfile.map((el, index) => (
                      <Box key={index}>{el.content}</Box>
                    ))}
                  </Box>

                  <Box
                    mb="19px"
                    rounded="5px"
                    display="flex"
                    alignItems="center"
                    bg="#1F1F1F"
                    textAlign="center"
                  >
                    <Box
                      w="18%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <SvgMore />
                    </Box>
                    <Box
                      w="90%"
                      mx="auto"
                      h="50px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Select
                        w="60%"
                        borderColor="transparent"
                        value={language ? language : "en"}
                        color="white"
                        fontWeight="300"
                        fontSize="13px"
                        fontFamily="inter"
                        onChange={(e) => onChange(e.target.value)}
                      >
                        <option value="en" style={{ color: "black" }}>
                          English
                        </option>
                        <option value="de" style={{ color: "black" }}>
                          Deutsch
                        </option>
                      </Select>
                    </Box>
                  </Box>

                  <Box
                    mb="19px"
                    rounded="5px"
                    display="flex"
                    alignItems="center"
                    bg="#1F1F1F"
                    textAlign="center"
                    onClick={() => {
                      localStorage.removeItem("refreshToken");
                      localStorage.removeItem("accessToken");
                      window.location.reload();
                    }}
                  >
                    <Box
                      w="18%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <SvgSignOut />
                    </Box>
                    <Box
                      w="90%"
                      mx="auto"
                      h="50px"
                      pr="65px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text
                        color="white"
                        fontWeight="300"
                        fontSize="13px"
                        fontFamily="inter"
                      >
                        <Trans>signOut</Trans>
                      </Text>
                    </Box>
                  </Box>

                  <Box
                    rounded="5px"
                    display="flex"
                    alignItems="center"
                    bg="#1F1F1F"
                    textAlign="center"
                    onClick={handleClickForDeleteProfile}
                  >
                    <Box
                      w="18%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <SvgBasket />
                    </Box>
                    <Box
                      w="90%"
                      mx="auto"
                      h="50px"
                      pr="40px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text
                        color="white"
                        fontWeight="300"
                        fontSize="13px"
                        fontFamily="inter"
                      >
                        <Trans>deleteProfile</Trans>
                      </Text>
                    </Box>
                  </Box>
                </Box>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
      <Popup modal={openPopup} setModal={setOpenPopup} />
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
            <Box zIndex="11">
              <Box maxW="372px" mx="auto" mt="19px" mb="30px">
                <Box w="30px" h="30px" onClick={handleCencelCrop}>
                  <SvgExet />
                </Box>
              </Box>
              <Box
                display="flex"
                minH="100vh"
                justifyContent="center"
                alignItems="start"
              >
                <Box px="20px">
                  <Box h="auto" pos="relative" maxW="428px">
                    {cropData ? (
                      <Image
                        src={cropData}
                        w="100%"
                        h="448px"
                        objectFit="cover"
                      />
                    ) : (
                      <Cropper
                        ref={cropperRef}
                        src={imageFile}
                        guides={false}
                        minCropBoxWidth={428}
                        minCropBoxHeight={448}
                        minCanvasWidth={428}
                        minCanvasHeight={448}
                        style={{ width: "100%", height: "448px" }}
                      />
                    )}
                    <Box bg="#141414">
                      {!filesId && (
                        <Input
                          defaultValue={title}
                          onChange={(e) => setTitle(e.target.value)}
                          bg="transparent"
                          color="white"
                          fontSize="15px"
                          placeholder="Title..."
                          rounded="0px"
                          fontWeight="700"
                          fontFamily="inter"
                          h="37px"
                          border={
                            textVaildate
                              ? "1px solid #FF0000"
                              : "1px solid transparent"
                          }
                          borderBottom={
                            textVaildate
                              ? "1px solid #FF0000"
                              : "1px solid #343434"
                          }
                        />
                      )}
                      <Input
                        defaultValue={text}
                        onChange={(e) => setText(e.target.value)}
                        bg="transparent"
                        color="white"
                        fontSize="15px"
                        placeholder="comentarie..."
                        rounded="0px"
                        fontWeight="300"
                        fontFamily="inter"
                        h="37px"
                        border={
                          textVaildate
                            ? "1px solid #FF0000"
                            : "1px solid transparent"
                        }
                      />
                    </Box>
                  </Box>
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
                      onClick={() => getCropData()}
                    >
                      Speichern
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
      {pdfIncludes && (
        <Box
          pos="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="black"
          zIndex="11"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box w="100%">
            <Box maxW="372px" mx="auto" mt="19px" mb="30px">
              <Box w="30px" h="30px" onClick={handleCloseModal}>
                <SvgExet />
              </Box>
            </Box>
            <Box maxW="428px" mx="auto" px="13px">
              <Box
                h="237px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg="#1A1A1A"
                mb="6px"
              >
                <SvgPdf />
              </Box>
              <Box mx="auto">
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  bg="white"
                  fontSize="12px"
                  fontFamily="inter"
                  rounded="0"
                  placeholder="Beschreibung..."
                  border={textVaildate ? "1px solid #FF0000" : "1px solid"}
                />
              </Box>

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
                  onClick={handlePostMoreFiles}
                >
                  Speichern
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}
