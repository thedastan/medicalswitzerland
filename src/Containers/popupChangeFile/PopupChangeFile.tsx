/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { motion, AnimatePresence } from "framer-motion";
import { createRef, useEffect, useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import { Button, Image, Input, Spinner } from "@chakra-ui/react";
import "cropperjs/dist/cropper.css";

import { useActionsFile, useActionsUser } from "../../Hooks/useActions";
import { useAppSelector } from "../../Hooks/Hooks";
import { dataURLtoFile, onChangeImage } from "../../Components/Helpers";
import API, { API_ADDRESS } from "../../Api";
import SvgPdf from "../../assets/svg/SvgPdf";
import SvgClose from "../../assets/svg/SvgClose";
import SvgPdfWhite from "../../assets/svg/SvgPdfWhite";
import SvgPhotosWhite from "../../assets/svg/SvgPhotoWhite";

interface IPopupChangeProps {
  idFile: string;
  setModal: (value: boolean) => void;
  // setDeleteCenceled: (value: boolean) => void;
  modal: boolean;
}

export default function PopupChangeFile({
  idFile,
  modal,
  setModal,
}: // setDeleteCenceled,
IPopupChangeProps) {
  const { ActionAllGroups, ActionGroupPut, ActionGroups, ActionGroupsForAkte } =
    useActionsFile();
  const { group } = useAppSelector((state) => state.filesReducer);

  const imageRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const cropperRef = createRef<ReactCropperElement>();

  const [accept, setAccept] = useState("");
  const [cropData, setCropData] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [text, setText] = useState("");

  const [filePdf, setFilePdf] = useState<any>();
  const [pdfIncludes, setPdfIncludes] = useState(false);
  const [loader, setLoader] = useState(false);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
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

  const handlePutFiles = async () => {
    const image = cropData
      ? dataURLtoFile(cropData, `${Math.floor(Math.random() * 100000)}.png`)
      : filePdf;
    if (cropData || filePdf) {
      const formData = new FormData();
      formData.append("file", filePdf);

      setLoader(true);
      await API.post("users/upload/", formData)
        .then(({ data }) => {
          if (data) {
            ActionGroupPut(idFile, group.id, {
              file_url: data.path || group.file_url,
              text: text || group.text,
              id: group.id,
            });
            ActionAllGroups();
            setCropData("");
            setImageFile("");
            setText("");
            setModal(false);
            // setDeleteCenceled(false);
            setLoader(false);
            setPdfIncludes(false);
          }
        })
        .catch((e) => {
          alert(`${e} Error`);
          setLoader(false);
          setText("");
          ActionAllGroups();
          setPdfIncludes(false);
        });
    } else {
      ActionGroupPut(idFile, group.id, {
        file_url: group.file_url,
        text: text || group.text,
        id: group.id,
      });
      ActionAllGroups();
      // setDeleteCenceled(false);
      setText("");
    }
  };

  const handlePutFile = () => {
    ActionGroupPut(idFile, group.id, {
      file_url: group.file_url,
      text: text || group.text,
      id: group.id,
    });
    ActionAllGroups();
    setCropData("");
    setImageFile("");
    setText("");
    setModal(false);
    // setDeleteCenceled(false);
    setPdfIncludes(false);
  };

  const handleCencelCrop = () => {
    setCropData("");
    setImageFile("");
    setText("");
    setModal(false);
  };

  const distributionFunction = async () => {
    if (!cropData) {
      await getCropData();
    } else {
      handlePutFiles();
    }
  };

  const handleCloseModal = () => {
    setModal(false);
    // setDeleteCenceled(false);
    setPdfIncludes(false);
    setText("");
  };

  useEffect(() => {
    if (idFile) {
      ActionGroups(idFile);
      ActionGroupsForAkte(idFile);
    }
  }, [idFile]);

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
            File is change...
          </Text>
          <Spinner color="white" />
        </Box>
      </Box>
    );
  }

  return (
    <AnimatePresence>
      {modal && (
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
              <Box bg="#202020" rounded="12px" zIndex="5" mr="auto" px="13px">
                <Box
                  w="20px"
                  h="20px"
                  ml="auto"
                  pt="9px"
                  mb="9px"
                  onClick={handleCloseModal}
                >
                  <SvgClose />
                </Box>
                <Box maxW="372px" mx="auto">
                  <Box
                    maxW="500px"
                    display="flex"
                    justifyContent="space-between"
                    mx="auto"
                    gap="2px"
                    mt="20px"
                    mb="10px"
                  >
                    <Button
                      textColor="white"
                      bg="#1A1A1A"
                      fontSize="8px"
                      fontWeight="300"
                      fontFamily="inter"
                      display="flex"
                      flexDir="column"
                      w="50%"
                      h="37px"
                      textTransform="uppercase"
                      rounded="0px"
                      onClick={() => fileRef.current?.click()}
                    >
                      <SvgPdfWhite />
                      <Text mt="5px">PDF</Text>
                    </Button>
                    <Button
                      textColor="white"
                      bg="#1A1A1A"
                      fontSize="8px"
                      fontWeight="300"
                      fontFamily="inter"
                      display="flex"
                      flexDir="column"
                      w="50%"
                      h="37px"
                      textTransform="uppercase"
                      rounded="0px"
                      onClick={() => {
                        setAccept("image/png, image/gif, image/jpeg");
                        imageRef.current?.click();
                      }}
                    >
                      <SvgPhotosWhite />
                      <Text mt="5px">Photo</Text>
                    </Button>
                  </Box>
                  {group.file_url.slice(-3) === "png" ? (
                    <Image
                      src={`${API_ADDRESS?.substring(0, 34)}${group.file_url}`}
                      w="100%"
                      h="237px"
                      mx="auto"
                      mb="4px"
                    />
                  ) : (
                    <Box
                      w="100%"
                      h="237px"
                      mx="auto"
                      mb="4px"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <SvgPdf />
                    </Box>
                  )}
                  <Input
                    value={text || group.text}
                    onChange={(e) => setText(e.target.value)}
                    bg="white"
                    mx="auto"
                    color="#323232"
                    fontSize="14px"
                    placeholder="Beschreibung..."
                    mb="6px"
                    maxW="372px"
                    h="36px"
                    rounded="0px"
                  />
                  <Button
                    textColor="black"
                    bg="#F90707"
                    fontSize="10px"
                    fontWeight="500"
                    rounded="0px"
                    w="100%"
                    h="37px"
                    textTransform="uppercase"
                    mb="20px"
                    onClick={handlePutFile}
                  >
                    DONE
                  </Button>
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
                </Box>
              </Box>
            </motion.div>
          </motion.div>
        </>
      )}
      {imageFile && (
        <Box
          pos="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="black"
          zIndex="7"
        >
          {imageFile && (
            <Box
              display="flex"
              minH="100vh"
              justifyContent="center"
              alignItems="center"
            >
              <Box px="20px">
                {cropData ? (
                  <Box w="100%">
                    <Image src={cropData} w="100%" h="237px" mb="10px" />
                    <Input
                      defaultValue={text || group.text}
                      onChange={(e) => setText(e.target.value)}
                      bg="white"
                      color="#323232"
                      fontSize="10px"
                      placeholder="Beschreibung..."
                      rounded="0px"
                      fontWeight="300"
                      fontFamily="inter"
                      h="37px"
                    />
                  </Box>
                ) : (
                  <Box h="300px" pos="relative" maxW="372px">
                    <Cropper
                      ref={cropperRef}
                      src={imageFile}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      zoomOnTouch={false}
                      zoomOnWheel={false}
                      zoomable={false}
                      minCanvasWidth={102}
                      minCanvasHeight={87}
                      style={{ width: "100%", height: "237px" }}
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
                    bg="#ff3a22"
                    fontSize="10px"
                    fontWeight="500"
                    w="50%"
                    h="36px"
                    rounded="0"
                    textTransform="uppercase"
                    onClick={handleCencelCrop}
                  >
                    Cencel
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
                    onClick={distributionFunction}
                    disabled={text?.length > 0 ? false : true}
                  >
                    {!cropData ? "Crop Image" : "Save"}
                  </Button>
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
          zIndex="7"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box w="100%" mx="auto" px="13px">
            <Box maxW="385px" mx="auto">
              <Box
                bg="#1A1A1A"
                maxW="372px"
                mx="auto"
                h="237px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb="5px"
              >
                <SvgPdf />
              </Box>
              <Box>
                <Input
                  defaultValue={group.text}
                  onChange={(e) => setText(e.target.value)}
                  bg="white"
                  h="36px"
                  rounded="0px"
                  fontFamily="inter"
                  fontWeight="500"
                  fontSize="12px"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              gap="2px"
              justifyContent="space-between"
              mt="30px"
              maxW="385px"
              mx="auto"
            >
              <Button
                textColor="white"
                bg="#F90707"
                fontSize="10px"
                fontWeight="300"
                w="50%"
                h="36px"
                rounded="0"
                textTransform="uppercase"
                onClick={handleCloseModal}
              >
                Cencel
              </Button>
              <Button
                textColor="black"
                bg="white"
                fontSize="10px"
                fontWeight="300"
                w="50%"
                h="36px"
                rounded="0"
                textTransform="uppercase"
                onClick={handlePutFiles}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}
