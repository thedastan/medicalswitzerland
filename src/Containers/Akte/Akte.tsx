/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { Button, Textarea } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import Slider from "react-slick";

/* Local dependencies */
import Card from "../../Components/Ui/Card/Card";
import MyButton from "../../Components/Ui/Button/Button";
import API from "../../Api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

import {
  useActionsFile,
  useActionsForModal,
  useActionsUser,
} from "../../Hooks/useActions";
import { useAppSelector } from "../../Hooks/Hooks";
import { IInterfaceUser } from "../../Components/Interface/redux/types/Types";
import { IGroupsTypes } from "../../Components/Interface/redux-image/types/Types";
import SvgDot from "../../assets/svg/SvgDot";

export default function Akte() {
  const {
    ActionFilesId,
    ActionActiveModalMedia,
    ActionActiveSubtrac,
    ActionActiveProfile,
  } = useActionsForModal();
  const { ActionGetUser, ActionPutUser, ActionBearbeiten } = useActionsUser();
  const { ActionAllGroups } = useActionsFile();
  const { allGroups } = useAppSelector((state) => state.filesReducer);
  const { bearbeiten, loading, user } = useAppSelector(
    (state) => state.userReducer
  );

  const { id } = useParams<string>();
  const [deleteImg, setDeleteImg] = useState(false);
  const [dataPost, setDataPost] = useState<IInterfaceUser>({});

  const dots = [];

  for (let i = 0; i < 3; i++) {
    dots.push(<SvgDot key={i} />);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // dotsClass: "slick-dots custom-dots-class",
  };

  const listInput = [
    {
      item: "OPERATIONEN",
      name: "operation",
      value: user.operation,
    },
    {
      item: "ALLERGIE",
      name: "allergies",
      value: user.allergies,
    },
    {
      item: "MEDIKAMENTE",
      name: "medikamente",
      value: user.medications,
    },
    {
      item: "NEDENDIAGNOSEN",
      name: "nedendiagnose",
      value: user.why_diagnose,
    },
    {
      item: "BERUF",
      name: "beruf",
      value: user.profession,
    },
    {
      item: "LOCATION",
      name: "location",
      value: user.contact,
    },
  ];

  const inputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };

  function deletedImage(data?: IGroupsTypes, idInfo?: string) {
    API.delete(`groups/${data?.id}/info/${idInfo}/`)
      .then(() => {
        ActionGetUser(id);
      })
      .catch((e) => {
        alert(`${e} Error`);
      });
  }

  function handleClickPut() {
    ActionBearbeiten(!bearbeiten);
    ActionPutUser({
      allergies: dataPost.allergies || user.allergies,
      allergies_text: dataPost.allergies_text || user.allergies_text,
      avatar: dataPost.avatar || user.avatar?.slice(6) || "",
      birth_date: dataPost.birth_date || user.birth_date || null,
      card_id: user.card_id || id,
      contact: dataPost.contact || user.contact || "",
      email: dataPost.email || user.email,
      emergency_contact:
        dataPost.emergency_contact || user.emergency_contact || "",
      medications: dataPost.medications || user.medications,
      operation: dataPost.operation || user.operation,
      particularities: dataPost.particularities || user.particularities,
      profession: dataPost.profession || user.profession,
      full_name: dataPost.full_name || user.full_name,
      why_diagnose: dataPost.why_diagnose || user.why_diagnose,
      location: user.location ? user.location : "",
    });
  }

  const handleClick = (id: string) => {
    ActionActiveModalMedia(true);
    ActionActiveProfile(false);
    ActionActiveSubtrac(true);
    ActionFilesId(id);
  };

  useEffect(() => {
    ActionGetUser(id);
  }, []);

  useEffect(() => {
    ActionAllGroups();
  }, []);

  if (loading) {
    <Box>Loadig...</Box>;
  }

  return (
    <Fragment>
      <Text
        color="white"
        fontFamily="inter"
        textAlign="center"
        mt="48px"
        mb="6px"
      >
        PATIENTENAKTE
      </Text>
      <Text color="#C7C4C4" textAlign="center" fontSize="22px" mb="49px">
        medical
        <span style={{ color: "#E11F26" }}>switzerland</span>
      </Text>

      <Text mb="28px" color="white" textAlign="center">
        {user.username}
      </Text>
      <Text color="white" textAlign="center" mb="33px">
        {user.birth_date}
      </Text>

      <Box
        display="flex"
        justifyContent="end"
        pb="11px"
        borderBottom="1px solid #454545"
        mb="29px"
      >
        <MyButton
          typeColor={!bearbeiten ? "white" : "darkGrey"}
          fontFamily="commissioner"
          marginRight="30px"
          color={!bearbeiten ? "black" : "white"}
          onClick={() =>
            !bearbeiten ? handleClickPut() : ActionBearbeiten(!bearbeiten)
          }
        >
          {!bearbeiten ? "SAVE" : "Bearbeiten"}
        </MyButton>
      </Box>
      <Box>
        {listInput.map((el, index) => (
          <Box
            key={index}
            borderBottom={
              listInput.length - 1 === index ? "0px" : "1px solid #454545"
            }
            marginBottom="29px"
          >
            <Text
              color="gray"
              fontSize="10px"
              fontWeight="700"
              fontFamily="inter"
              mb="3px"
              textAlign="center"
            >
              {el.item}
            </Text>
            <Textarea
              name={el.name}
              onChange={(e) => inputChange(e)}
              rounded="0px"
              outline="black"
              resize="none"
              color="white"
              fontSize="14px"
              borderColor="black"
              defaultValue={el.value ? el.value : ""}
              disabled={bearbeiten}
              textAlign="center"
              bg={!bearbeiten ? "colorForActiveInput" : "black"}
            />
          </Box>
        ))}

        {allGroups && (
          <Box
            display="flex"
            mb="11px"
            mt="46px"
            py="10px"
            gap="2px"
            w="32px"
            ml="auto"
            onClick={() => setDeleteImg(!deleteImg)}
          >
            {dots}
          </Box>
        )}

        {!bearbeiten ? (
          allGroups
            .filter((elem) => elem.is_akte === true)
            .map((el) => (
              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Text
                    color="White"
                    fontFamily="inter"
                    fontSize="18px"
                    mb="20px"
                  >
                    {el.title}
                  </Text>
                  {deleteImg && (
                    <Button
                      color="black"
                      fontSize="10px"
                      fontWeight="700"
                      fontFamily="inter"
                      bg="white"
                      w="102px"
                      h="26px"
                      onClick={() => handleClick(el.id)}
                    >
                      Added image
                    </Button>
                  )}
                </Box>
                {el?.info_list.map((item, index) => (
                  <Card
                    key={index}
                    el={item}
                    deleteImg={deleteImg}
                    handleId={deletedImage}
                    object={el}
                  />
                ))}
              </Box>
            ))
        ) : (
          <>
            {allGroups
              .filter((elem) => elem.is_akte === true)
              .map((el) => (
                <Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text
                      color="White"
                      fontFamily="inter"
                      fontSize="18px"
                      mb="20px"
                    >
                      {el.title}
                    </Text>
                    {deleteImg && (
                      <Button
                        color="black"
                        fontSize="10px"
                        fontWeight="700"
                        fontFamily="inter"
                        bg="white"
                        w="102px"
                        h="26px"
                        onClick={() => handleClick(el.id)}
                      >
                        Added image
                      </Button>
                    )}
                  </Box>
                  <Slider {...settings}>
                    {el?.info_list.map((item, index) => (
                      <Card
                        key={index}
                        el={item}
                        deleteImg={deleteImg}
                        handleId={deletedImage}
                        object={el}
                      />
                    ))}
                  </Slider>
                </Box>
              ))}
          </>
        )}
      </Box>
    </Fragment>
  );
}
