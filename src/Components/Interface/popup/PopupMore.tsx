/* External dependencies */
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";

/* Local dependencies */
import SvgMore from "../../../assets/svg/SvgMore";
import SvgMail from "../../../assets/svg/SvgMail";
import SvgWhatsapp from "../../../assets/svg/SvgWhatsapp";
import SvgPhoneCall from "../../../assets/svg/SvgPhoneCall";
import SvgInstagram from "../../../assets/svg/SvgInstagram";
import SvgLinkedin from "../../../assets/svg/SvgLinkedin";
import Medical from "../../../assets/Image/Medical.png";
import Map from "../../../assets/Image/Map.png";
import "./style.css";

import { useAppSelector } from "../../../Hooks/Hooks";
import { useActionsUser } from "../../../Hooks/useActions";
import SvgSaveContact from "../../../assets/svg/SvgSaveContact";

interface IPopupMoreProps {
  setModal: (value: boolean) => void;
}

export default function PopupMore({ setModal }: IPopupMoreProps) {
  const { ActionGetUser } = useActionsUser();
  const { user } = useAppSelector((state) => state.userReducer);

  const handleCloseModal = () => {
    setModal(false);
  };
  const { t } = useTranslation();

 const handleDownload = () => {
    const vcfData = 
          "BEGIN:VCARD\n" +
          "VERSION:3.0\n" +
          "N:Mrs. Jennifer Urwyler;\n" +
          "ORG:Medical Switzerland\n" +
          "TEL;TYPE=WORK,VOICE:+41797545136\n" +
          "URL;TYPE=WORK:www.medicalswitzerland.ch"\"+ 
          "ADR;TYPE=WORK:;;Baar, Switzerland Head Office \n" +
          "EMAIL;CHARSET=UTF-8;type=WORK,INTERNET:info@medicalswitzerland.ch\n"+
          "X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/jennifer-urwyler-05366884\n"+
          "X-SOCIALPROFILE;TYPE=instagram:https://www.instagram.com/medicalsswitzerland\n"+
          "X-SOCIALPROFILE;TYPE=https://wa.me/+41797545136\n"+
          "END:VCARD";
                    
    const element = document.createElement("a");
    const file = new Blob([vcfData], {type: 'text/vcard'});
    element.href = URL.createObjectURL(file);
    element.download = "medicalswitzerland.vcf";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  

  const listSvg = [
    {
      svg: <SvgMore />,
      link: "https://www.medicalswitzerland.ch/",
    },
    {
      svg: <SvgMail />,
      link: "mailto:info@medicalswitzerland.ch",
    },
    {
      svg: <SvgWhatsapp />,
      link: "https://wa.me/+41797545136",
    },
    {
      svg: <SvgPhoneCall />,
      link: "tel:+41797545136",
    },
    {
      svg: <SvgInstagram />,
      link: "https://www.instagram.com/medicalsswitzerland/",
    },
    {
      svg: <SvgLinkedin />,
      link: "https://www.linkedin.com/in/jennifer-urwyler-05366884/",
    },
  ];

  useEffect(() => {
    ActionGetUser(window.location.pathname.slice(6));
  }, []);

  return (
    <AnimatePresence>
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
          <Box roundedTop="10px" bg="white">
            <Box w="100%" position="relative">
              <Image
                src={Medical}
                w="100%"
                objectFit="cover"
                h="217px"
                roundedTop="10px"
              />
              <Text
                position="absolute"
                fontFamily="Helvetica"
                fontSize="18px"
                textAlign="center"
                right="40px"
                bottom="10px"
              >
                Your personal <br /> Contact
              </Text>
            </Box>
            <Box
              px="13px"
              py="18px"
              display="flex"
              justifyContent="space-between"
            >
              <Box w="45%">
                <Text fontSize="22px" textColor="middleGray" h="25px">
                  medical
                </Text>
                <Text fontSize="22px" color="red" mb="26px" w="150%">
                  switzerland{" "}
                  <span style={{ color: "black" }}>
                    Hello {user.full_name?.split(" ")[0]}
                  </span>
                </Text>

                <Box display="flex" flexWrap="wrap" gap="14px">
                  {listSvg.map((el, index) => (
                    <a href={el.link} target="_blank">
                      <Box
                        key={index}
                        w="35.75px"
                        h="35.75px"
                        bg="black"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        rounded="50%"
                      >
                        {el.svg}
                      </Box>
                    </a>
                  ))}
                </Box>
              </Box>
              <Box w="53%">
                <Box mb="13px">
                  <Image src={Map} w="93%" ml="auto" objectFit="cover" />
                </Box>

                <Box
                  mx="auto"
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Button
                    w="176px"
                    position="static"
                    fontSize="12px"
                    fontWeight="700"
                    bg="#0B6CFF"
                    rounded="5px"
                    h="44px"
                    color="white"
                    mt="35px"
                    onClick={() => handleDownload()}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text w="70%" textAlign="start">
                      <Trans>saveContact</Trans>
                    </Text>
                    <Box w="30%">
                      <Box
                        ml="auto"
                        bg="white"
                        rounded="50%"
                        w="24px"
                        h="24px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <SvgSaveContact />
                      </Box>
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
