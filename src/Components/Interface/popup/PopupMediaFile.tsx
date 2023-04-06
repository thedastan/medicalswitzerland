/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

/* Local dependencies */
import SvgPhoneCall from "../../../assets/svg/SvgPhoneCall";
import SvgMail from "../../../assets/svg/SvgMail";
import SvgLocation from "../../../assets/svg/SvgLocation";
import SvgBasket from "../../../assets/svg/SvgBasket";
import Popup from "../../Ui/popup/Popup";
import "./style.css";

interface IModalProps {
  modal: boolean;
  setModal: (value: boolean) => void;
  profile: boolean;
  subtract: boolean;
}

export default function PopupMediaFile({
  modal,
  setModal,
  profile,
  subtract,
}: IModalProps) {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [accept, setAccept] = useState<string>();
  const [openPopup, setOpenPopup] = useState(false);
  const [value, setValue] = useState<string>();

  const listProfile = [
    {
      svg: <SvgPhoneCall />,
      item: "+41 765-5556-40",
    },
    {
      svg: <SvgMail />,
      item: "name@mail.com",
    },
    {
      svg: <SvgLocation />,
      item: "City,street, home No",
    },
    {
      svg: <SvgBasket />,
      item: "Delete profile",
    },
  ];

  return (
    <AnimatePresence>
      {modal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            className={`modal-backdrop`}
            onClick={() => setModal(false)}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            className="modal-content-wrapper"
            onClick={() => setModal(false)}
          >
            <motion.div
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
                      ref.current?.click();
                    }}
                    fontFamily="inter"
                  >
                    Photo
                  </Text>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept={accept}
                    ref={ref}
                  />
                  <Text
                    cursor="pointer"
                    color="#0F6FFF"
                    py="10px"
                    bg="thirdlittleGray"
                    textAlign="center"
                    roundedBottom="7px"
                    onClick={() => {
                      setAccept(
                        "application / pdf, application / vnd.ms - excel"
                      );
                      ref.current?.click();
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
                      <Text
                        color="white"
                        w="90%"
                        mx="auto"
                        borderBottom={
                          listProfile.length - 1 !== index
                            ? "1px solid black"
                            : "0px"
                        }
                        py="15px"
                        fontWeight="300"
                        fontSize="13px"
                        fontFamily="inter"
                      >
                        {el.item}
                      </Text>
                    </Box>
                  ))}
                </Box>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
      <Popup modal={openPopup} setModal={setOpenPopup} />
    </AnimatePresence>
  );
}
