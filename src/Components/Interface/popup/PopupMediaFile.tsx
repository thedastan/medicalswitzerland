/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { motion, AnimatePresence } from "framer-motion";
import { createRef, useEffect, useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import { Button, Image, Input, Spinner } from "@chakra-ui/react";
import "cropperjs/dist/cropper.css";

/* Local dependencies */
import SvgPhoneCall from "../../../assets/svg/SvgPhoneCall";
import SvgMail from "../../../assets/svg/SvgMail";
import SvgLocation from "../../../assets/svg/SvgLocation";
import SvgBasket from "../../../assets/svg/SvgBasket";
import SvgPdf from "../../../assets/svg/SvgPdf";
import Popup from "../../Ui/popup/Popup";
import API from "../../../Api";
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
    alert("POST");
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
    alert("MORE");
    const image = cropData
      ? dataURLtoFile(cropData, `${Math.floor(Math.random() * 100000)}.png`)
      : filePdf;
    const formData = new FormData();
    formData.append("file", image);

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

  useEffect(() => {
    if (cropData) {
      handlePostFiles();
    }
  }, [validate]);

  useEffect(() => {
    if (filesId) {
      handlePostMoreFiles();
    }
  }, [renderMore]);

  const listProfile = [
    {
      content: user.emergency_contact && (
        <Box
          display="flex"
          alignItems="center"
          bg="thirdlittleGray"
          textAlign="center"
          borderTopRadius="12px"
        >
          <Box
            w="10%"
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
            borderBottom="1px solid"
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
          bg="thirdlittleGray"
          textAlign="center"
          px="2px"
          borderTopRadius={!user.emergency_contact ? "12px" : "0px"}
        >
          <Box
            w="10%"
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
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderBottom="1px solid"
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
          bg="thirdlittleGray"
          textAlign="center"
        >
          <Box
            w="10%"
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
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderBottom="1px solid"
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
    {
      content: (
        <Box
          display="flex"
          alignItems="center"
          bg="thirdlittleGray"
          textAlign="center"
          borderBottomRadius="12px"
          onClick={handleClickForDeleteProfile}
        >
          <Box
            w="10%"
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
              Delete profile
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
                <Box zIndex="6">
                  {listProfile.map((el, index) => (
                    <Box key={index}>{el.content}</Box>
                  ))}
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
          zIndex="8"
        >
          {imageFile && (
            <Box>
              <Box maxW="372px" mx="auto" mt="19px">
                <Box w="30px" h="30px" onClick={handleCencelCrop}>
                  <SvgExet />
                </Box>
              </Box>
              <Box
                display="flex"
                minH="100vh"
                justifyContent="center"
                alignItems="center"
              >
                <Box px="20px">
                  <Box h="300px" pos="relative" maxW="372px">
                    {cropData ? (
                      <Image
                        src={cropData}
                        w="100%"
                        h="237px"
                        objectFit="cover"
                      />
                    ) : (
                      <Cropper
                        ref={cropperRef}
                        src={imageFile}
                        guides={false}
                        minCropBoxWidth={372}
                        minCropBoxHeight={237}
                        minCanvasWidth={372}
                        minCanvasHeight={237}
                        style={{ width: "100%", height: "237px" }}
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
          zIndex="8"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box w="100%">
            <Box maxW="372px" mx="auto" px="13px">
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
                display="flex"
                w="100%"
                gap="4px"
                justifyContent="space-between"
                mt="10px"
              >
                <Button
                  textColor="white"
                  bg="#ff3a22"
                  fontSize="10px"
                  fontWeight="500"
                  w="50%"
                  h="36px"
                  rounded="0"
                  textTransform="uppercase"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  textColor="black"
                  bg="white"
                  fontSize="10px"
                  fontWeight="500"
                  w="50%"
                  h="36px"
                  rounded="0"
                  textTransform="uppercase"
                  onClick={handlePostMoreFiles}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}
