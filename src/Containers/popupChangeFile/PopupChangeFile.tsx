/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { motion, AnimatePresence } from "framer-motion";
import { createRef, useEffect, useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import { Button, Image, Input } from "@chakra-ui/react";
import "cropperjs/dist/cropper.css";

import { useActionsFile, useActionsUser } from "../../Hooks/useActions";
import { useAppSelector } from "../../Hooks/Hooks";
import { dataURLtoFile, onChangeImage } from "../../Components/Helpers";
import API, { API_ADDRESS } from "../../Api";
import SvgPdf from "../../assets/svg/SvgPdf";

interface IPopupChangeProps {
  idFile: string;
  setModal: (value: boolean) => void;
  setDeleteCenceled: (value: boolean) => void;
  modal: boolean;
}

export default function PopupChangeFile({
  idFile,
  modal,
  setModal,
  setDeleteCenceled,
}: IPopupChangeProps) {
  const { ActionAllGroups, ActionGroupPut, ActionGroups, ActionGroupsForAkte } =
    useActionsFile();
  const { group } = useAppSelector((state) => state.filesReducer);

  const imageRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const cropperRef = createRef<ReactCropperElement>();

  const [changeFile, setChangeFile] = useState(false);
  const [accept, setAccept] = useState("");
  const [cropData, setCropData] = useState("");
  const [imageFile, setImageFile] = useState("");

  const [filePdf, setFilePdf] = useState<any>();
  const [pdfIncludes, setPdfIncludes] = useState(false);
  const [text, setText] = useState("");

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
    if (cropData) {
      const formData = new FormData();
      formData.append("file", image);
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
            setDeleteCenceled(false);
          }
        })
        .catch((e) => {
          alert(`${e} Error`);
        });
    } else {
      ActionGroupPut(idFile, group.id, {
        file_url: group.file_url,
        text: text || group.text,
        id: group.id,
      });
      setDeleteCenceled(false);
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
    setDeleteCenceled(false);
  };

  const handleCencelCrop = () => {
    setCropData("");
    setImageFile("");
    setText("");
    setModal(false);
    setChangeFile(false);
  };

  const distributionFunction = async () => {
    if (!cropData) {
      await getCropData();
    } else {
      handlePutFiles();
      setChangeFile(false);
    }
  };

  const handleCloseModal = () => {
    setModal(false);
    setChangeFile(false);
    setDeleteCenceled(false);
  };

  useEffect(() => {
    if (idFile) {
      ActionGroups(idFile);
      ActionGroupsForAkte(idFile);
    }
  }, [idFile]);

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
              {!changeFile ? (
                <Box
                  bg="thirdlittleGray"
                  rounded="12px"
                  zIndex="5"
                  py="30px"
                  mr="auto"
                >
                  <Box maxW="372px" mx="auto">
                    <Image
                      src={`${API_ADDRESS?.substring(0, 34)}${group.file_url}`}
                      maxW="372px"
                      mx="auto"
                      mb="20px"
                    />
                    <Input
                      defaultValue={group.text}
                      onChange={(e) => setText(e.target.value)}
                      bg="white"
                      color="#323232"
                      fontSize="14px"
                      placeholder="Beschreibung..."
                      mb="20px"
                      maxW="372px"
                    />
                    <Button
                      textColor="white"
                      bg="whatsapp.500"
                      fontSize="10px"
                      fontWeight="700"
                      w="100%"
                      h="35px"
                      textTransform="uppercase"
                      onClick={handlePutFile}
                    >
                      Save file !
                    </Button>
                    <Box
                      maxW="500px"
                      display="flex"
                      justifyContent="space-between"
                      mx="auto"
                      gap="10px"
                      mt="20px"
                    >
                      <Button
                        textColor="white"
                        bg="#ff3a22"
                        fontSize="10px"
                        fontWeight="700"
                        w="40vw"
                        h="35px"
                        textTransform="uppercase"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </Button>
                      <Button
                        textColor="black"
                        bg="white"
                        fontSize="10px"
                        fontWeight="700"
                        w="40vw"
                        h="35px"
                        textTransform="uppercase"
                        onClick={() => setChangeFile(!changeFile)}
                      >
                        Change image
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box>
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
                      defaultValue={group.text}
                      onChange={(e) => setText(e.target.value)}
                      bg="white"
                      color="#323232"
                      fontSize="14px"
                      placeholder="Beschreibung..."
                    />
                  </Box>
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
                  maxW="500px"
                  display="flex"
                  justifyContent="space-between"
                  mx="auto"
                  gap="10px"
                  mt="20px"
                >
                  <Button
                    textColor="white"
                    bg="#ff3a22"
                    fontSize="10px"
                    fontWeight="700"
                    w="40vw"
                    h="35px"
                    textTransform="uppercase"
                    onClick={handleCencelCrop}
                  >
                    Cencel
                  </Button>
                  <Button
                    textColor="black"
                    bg="white"
                    fontSize="10px"
                    fontWeight="700"
                    w="40vw"
                    h="35px"
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
        >
          <Box>
            <Box
              mx="auto"
              maxW="372px"
              h="237px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <SvgPdf />
            </Box>
            <Box mx="auto" maxW="372px">
              <Input
                defaultValue={group.text}
                onChange={(e) => setText(e.target.value)}
                bg="white"
                fontSize="16px"
              />
            </Box>
          </Box>
          <Box display="flex" w="100%" justifyContent="space-evenly" mt="50px">
            <Button
              textColor="white"
              bg="#ff3a22"
              fontSize="10px"
              fontWeight="500"
              w="80px"
              h="30px"
              textTransform="uppercase"
              onClick={handleCloseModal}
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
              onClick={handlePutFiles}
            >
              Save Files
            </Button>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}
