/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { Button, Input, Textarea } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import Slider from "react-slick";

/* Local dependencies */
import SvgDot from "../../assets/svg/SvgDot";
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
import {
  IGroupsTypes,
  IInfoList,
} from "../../Components/Interface/redux-image/types/Types";
import PopupChangeFile from "../popupChangeFile/PopupChangeFile";

interface IGroupType {
  id?: string;
  title?: string;
  info_list?: IInfoList[];
  is_akte?: boolean;
}

export default function Akte() {
  const {
    ActionFilesId,
    ActionActiveModalMedia,
    ActionActiveSubtrac,
    ActionActiveProfile,
  } = useActionsForModal();
  const { ActionGetUser, ActionPutUser, ActionBearbeiten } = useActionsUser();
  const {
    ActionAllGroups,
    ActionAllGroupsPut,
    ActionGroupsForAkte,
    ActionGroup,
  } = useActionsFile();
  const { allGroups, groups } = useAppSelector((state) => state.filesReducer);
  const { bearbeiten, loading, user } = useAppSelector(
    (state) => state.userReducer
  );

  const { id } = useParams<string>();
  const [idFile, setIdFile] = useState("");
  const [idFiles, setIdFiles] = useState("");

  const [dataPost, setDataPost] = useState<IInterfaceUser>({});
  const [dataPutFiles, setDataPutFiles] = useState<IGroupType>({});

  const [modalChange, setModalChange] = useState(false);
  const [deleteImg, setDeleteImg] = useState(false);

  const [disabledFiles, setDisabledFiles] = useState(false);

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

  const inputChangeForFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPutFiles({ ...dataPutFiles, [e.target.name]: e.target.value });
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

  function handleClickPutFiles(id: string) {
    if (groups.id) {
      ActionAllGroupsPut(idFiles, {
        id: id,
        title: dataPutFiles.title || groups.title,
        info_list: groups?.info_list.map((el) => el.id),
        is_akte: true,
      });
      setDisabledFiles(false);
    }
    getIdForFiles(id);
    setDisabledFiles(!disabledFiles);
  }

  function getIdForFiles(id: string) {
    ActionGroupsForAkte(id);
    setIdFiles(id);
  }

  function getIdForFile(data: IGroupsTypes, id: string) {
    ActionGroup(data.id, id);
    setModalChange(true);
    setIdFile(data.id);
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
                <Box
                  display="flex"
                  flexDir="column"
                  justifyContent="space-between"
                  mb="10px"
                >
                  <Input
                    w="100%"
                    fontSize="18px"
                    fontFamily="inter"
                    mb="20px"
                    defaultValue={el.title}
                    outline="black"
                    rounded="0px"
                    h="27px"
                    color="white"
                    pl="0"
                    borderColor="black"
                    name="title"
                    disabled={!disabledFiles || idFiles !== el.id}
                    bg={
                      disabledFiles && idFiles === el.id
                        ? "colorForActiveInput"
                        : "black"
                    }
                    onChange={(e) => inputChangeForFiles(e)}
                  />
                  <Box display="flex" justifyContent="space-between">
                    {deleteImg && (
                      <Button
                        color="black"
                        fontSize="10px"
                        fontWeight="700"
                        fontFamily="inter"
                        bg="white"
                        w="102px"
                        h="26px"
                        onClick={() => {
                          handleClickPutFiles(el.id);
                        }}
                      >
                        {disabledFiles && el.id === idFiles
                          ? "Save change"
                          : "Change info"}
                      </Button>
                    )}
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
                </Box>
                {el?.info_list.map((item, index) => (
                  <Card
                    key={index}
                    el={item}
                    deleteImg={deleteImg}
                    handleIdForDelete={deletedImage}
                    handleIdForChange={getIdForFile}
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
                <Box key={el.id}>
                  <Box
                    display="flex"
                    flexDir="column"
                    justifyContent="space-between"
                    mb="10px"
                  >
                    <Input
                      w="100%"
                      fontSize="18px"
                      fontFamily="inter"
                      mb="20px"
                      defaultValue={el.title}
                      outline="black"
                      rounded="0px"
                      h="27px"
                      color="white"
                      pl="0"
                      borderColor="black"
                      name="title"
                      disabled={!disabledFiles || idFiles !== el.id}
                      bg={
                        disabledFiles && idFiles === el.id
                          ? "colorForActiveInput"
                          : "black"
                      }
                      onChange={(e) => inputChangeForFiles(e)}
                    />
                    <Box display="flex" justifyContent="space-between">
                      {deleteImg && (
                        <Button
                          color="black"
                          fontSize="10px"
                          fontWeight="700"
                          fontFamily="inter"
                          bg="white"
                          w="102px"
                          h="26px"
                          onClick={() => {
                            handleClickPutFiles(el.id);
                          }}
                        >
                          {disabledFiles && el.id === idFiles
                            ? "Save change"
                            : "Change info"}
                        </Button>
                      )}
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
                  </Box>
                  <Slider {...settings}>
                    {el?.info_list.map((item, index) => (
                      <Card
                        key={index}
                        el={item}
                        deleteImg={deleteImg}
                        handleIdForDelete={deletedImage}
                        handleIdForChange={getIdForFile}
                        object={el}
                      />
                    ))}
                  </Slider>
                </Box>
              ))}
          </>
        )}
      </Box>
      <Box display="flex" justifyContent="center">
        <PopupChangeFile
          idFile={idFile}
          modal={modalChange}
          setModal={setModalChange}
          setDeleteCenceled={setDeleteImg}
        />
      </Box>
    </Fragment>
  );
}
