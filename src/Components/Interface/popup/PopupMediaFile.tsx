/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { motion, AnimatePresence } from "framer-motion";
import { createRef, useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import { Button, Image, Input } from "@chakra-ui/react";
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

import { dataURLtoFile, onChangeImage } from "../../Helpers";
import { useAppSelector } from "../../../Hooks/Hooks";
import { useActionsFile, useActionsForModal } from "../../../Hooks/useActions";

export default function PopupMediaFile() {
  const { ActionActiveModalMedia } = useActionsForModal();
  const { ActionAllGroups } = useActionsFile();
  const { filesId, activeMediaModal, profile, subtract } = useAppSelector(
    (state) => state.idReducer
  );
  const { user } = useAppSelector((state) => state.userReducer);

  const imageRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const cropperRef = createRef<ReactCropperElement>();

  const [accept, setAccept] = useState("");
  const [cropData, setCropData] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [filePdf, setFilePdf] = useState<any>();
  const [pdfIncludes, setPdfIncludes] = useState(false);
  const [text, setText] = useState("");

  const listProfile = [
    {
      svg: <SvgPhoneCall />,
      item: user.contact || " ",
    },
    {
      svg: <SvgMail />,
      item: user.email || " ",
    },
    {
      svg: <SvgLocation />,
      item: user.location || " ",
    },
    {
      svg: <SvgBasket />,
      item: "Delete profile",
    },
  ];

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

  const handlePostFiles = async () => {
    const image = cropData
      ? dataURLtoFile(cropData, `${Math.floor(Math.random() * 100000)}.png`)
      : filePdf;
    const formData = new FormData();
    formData.append("file", image);
    await API.post("users/upload/", formData)
      .then(({ data }) => {
        if (data) {
          API.post(`groups/${filesId}/info/`, {
            text: text,
            file_url: data.path,
          });
          ActionAllGroups();
          setCropData("");
          setImageFile("");
          setText("");
          ActionActiveModalMedia(false);
        }
      })
      .catch((e) => {
        alert(`${e} Error`);
      });
  };

  const handleCencelCrop = () => {
    setCropData("");
    setImageFile("");
    setText("");
    ActionActiveModalMedia(false);
  };

  const distributionFunction = async () => {
    if (!cropData) {
      await getCropData();
    } else {
      handlePostFiles();
    }
  };

  const handleCloseModal = () => {
    ActionActiveModalMedia(false);
  };

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
              {profile && (
                <Box>
                  {listProfile.map((el, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      bg="thirdlittleGray"
                      textAlign="center"
                      roundedTop={index === 0 ? "12px" : "0"}
                      roundedBottom={
                        listProfile.length - 1 === index ? "12px" : "0"
                      }
                      onClick={() => setOpenPopup(true)}
                    >
                      <Box pl={index > 1 ? "12px" : "10px"}>{el.svg}</Box>
                      <Box
                        w="90%"
                        mx="auto"
                        h="50px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderBottom={
                          listProfile.length - 1 !== index
                            ? "1px solid black"
                            : "0px"
                        }
                      >
                        <Text
                          color="white"
                          fontWeight="300"
                          fontSize="13px"
                          fontFamily="inter"
                        >
                          {el.item}
                        </Text>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
      <Popup modal={openPopup} setModal={setOpenPopup} />
      {imageFile && (
        <Box pos="fixed" top="0" left="0" right="0" bottom="0" bg="black">
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
                      value={text}
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
        <Box pos="fixed" top="0" left="0" right="0" bottom="0" bg="black">
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
                value={text}
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
              onClick={handlePostFiles}
            >
              Save Files
            </Button>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}
