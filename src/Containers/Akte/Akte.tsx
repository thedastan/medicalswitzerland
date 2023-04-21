/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { Button, Input, Spinner, Textarea } from "@chakra-ui/react";
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
import SvgBluePluse from "../../assets/svg/SvgBluePlus";
import SvgRedBasket from "../../assets/svg/SvgRedBasket";

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
  const { ActionGetUser, ActionPutUser, ActionBearbeitenAkte } =
    useActionsUser();
  const {
    ActionAllGroups,
    ActionAllGroupsPut,
    ActionGroups,
    ActionGroup,
    ActionGroupsForAkte,
    ActionGroupPut,
    ActionGroupsInfo,
  } = useActionsFile();

  const {
    allGroups,
    groups,
    loading: loader,
    group,
  } = useAppSelector((state) => state.filesReducer);

  const { bearbeitenAkte, loading, user, error } = useAppSelector(
    (state) => state.userReducer
  );

  const { id } = useParams<string>();
  const [idFile, setIdFile] = useState("");
  const [idFiles, setIdFiles] = useState("");

  const [dataPost, setDataPost] = useState<IInterfaceUser>({});
  const [deleteImg, setDeleteImg] = useState(false);

  const [disabledFiles, setDisabledFiles] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const dots: any[] = [];

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
      name: "medications",
      value: user.medications,
    },
    {
      item: "NEDENDIAGNOSEN",
      name: "why_diagnose",
      value: user.why_diagnose,
    },
    {
      item: "BERUF",
      name: "profession",
      value: user.profession,
    },
    {
      item: "LOCATION",
      name: "location",
      value: user.location,
    },
  ];

  const inputChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };

  function deletedImage(data?: IGroupsTypes, idInfo?: string) {
    API.delete(`groups/${data?.id}/info/${idInfo}/`)
      .then(() => {
        ActionGetUser(id);
        ActionAllGroups();
        ActionGroups(data?.id);
      })
      .catch((e) => {
        alert(`${e} Error`);
      });
  }

  function handleClickPut() {
    ActionBearbeitenAkte(!bearbeitenAkte);
    ActionPutUser(window.location.pathname.slice(6), {
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
      full_name: dataPost.full_name || user.full_name || "",
      username: dataPost.full_name || user.full_name || "",
      why_diagnose: dataPost.why_diagnose || user.why_diagnose,
      location: dataPost.location || user.location || "",
    });
  }

  const handleClick = (id: string, idInfo: string, data: IGroupsTypes) => {
    setDisabledFiles(!disabledFiles);
    ActionGroup(data.id, idInfo);
    setDeleteImg(!deleteImg);
    setIdFile(idInfo);
    ActionFilesId(id);
    setIdFiles(id);
    console.log(data, "OBJECT_DATA");
  };

  const handlePutFile = () => {
    alert("Put");
    ActionAllGroupsPut(idFiles, {
      id: groups.id,
      title: title || groups.title,
      info_list: groups?.info_list.map((el) => el.id),
      is_akte: true,
    });

    ActionGroupPut(idFiles, group.id, {
      file_url: group.file_url,
      text: text || group.text,
      id: group.id,
    });
    setDisabledFiles(!disabledFiles);
    setDeleteImg(!deleteImg);
    ActionGroups(groups.id);
    ActionAllGroups();
    setIdFiles("");
    setIdFile("");
    setText("");
  };

  useEffect(() => {
    ActionGetUser(id);
  }, []);

  useEffect(() => {
    ActionAllGroups();
  }, []);

  useEffect(() => {
    if (idFile) {
      ActionGroups(idFile);
      ActionGroupsForAkte(idFile);
    }
  }, [idFile]);

  if (loading) {
    return (
      <Box textColor="white" display="flex" justifyContent="center">
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        textColor="white"
        textAlign="center"
        display="flex"
        justifyContent="center"
      >
        Error <Text pl="5px">{`${error}`}</Text>
      </Box>
    );
  }

  return (
    <Fragment>
      <Box position="relative">
        <Text
          color="white"
          fontFamily="inter"
          textAlign="center"
          mt="48px"
          mb="6px"
          fontSize="15px"
          fontWeight="700"
        >
          PATIENTENAKTE
        </Text>
        <Text color="#C7C4C4" textAlign="center" fontSize="18px" mb="35px">
          medical
          <span style={{ color: "#E11F26" }}>switzerland</span>
        </Text>
        <Box px="12px">
          <Text fontSize="14px" color="white" textAlign="center" mb="30px">
            {user.full_name || "Name"}
          </Text>
          <Text fontSize="14px" color="white" textAlign="center" mb="33px">
            {user.birth_date || "GEBURTSDATUM"}
          </Text>
        </Box>

        <Box
          display="flex"
          justifyContent="end"
          pb="11px"
          borderBottom="1px solid #454545"
          mb="29px"
        >
          <MyButton
            typeColor={!bearbeitenAkte ? "transparent" : "darkGrey"}
            fontFamily="commissioner"
            marginRight="16px"
            color={!bearbeitenAkte ? "black" : "white"}
            onClick={() =>
              !bearbeitenAkte
                ? console.log("beiten")
                : ActionBearbeitenAkte(!bearbeitenAkte)
            }
          >
            {!bearbeitenAkte ? "SAVE" : "Bearbeiten"}
          </MyButton>
        </Box>
        <Box px="12px">
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
              <textarea
                name={el.name}
                onChange={(e) => inputChange(e)}
                defaultValue={el.value ? el.value : ""}
                disabled={bearbeitenAkte}
                placeholder={!bearbeitenAkte ? "Allergie hinzufugen" : ""}
                className={`textarea--akte ${!bearbeitenAkte ? "active" : ""}`}
              />
            </Box>
          ))}
          <Box display="flex" flexDir="column-reverse">
            {allGroups
              .filter((elem) => elem.is_akte === true)
              .map((el) => (
                <Box key={el.id} maxW="372px" mx="auto">
                  <Box mb="50px">
                    <Slider {...settings}>
                      {el?.info_list.map((item, index) => (
                        <Box>
                          <Box
                            position="relative"
                            maxW="426px"
                            mx="auto"
                            h="448px"
                            bg="#131313"
                            display="flex"
                            alignItems="center"
                          >
                            <Button
                              position="absolute"
                              display="flex"
                              w="30px"
                              h="10px"
                              px="0"
                              ml="auto"
                              top="17px"
                              right="11px"
                              zIndex="5"
                              onClick={() => handleClick(el.id, item.id, el)}
                            >
                              {dots}
                            </Button>
                            {deleteImg && (
                              <Box
                                rounded="50%"
                                bg="black"
                                w="30px"
                                h="30px"
                                pos="absolute"
                                top="51px"
                                right="17px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                zIndex="5"
                                onClick={() => deletedImage(el, el.id)}
                              >
                                <SvgRedBasket />
                              </Box>
                            )}
                            <Card
                              key={index}
                              el={item}
                              deleteImg={deleteImg}
                              object={el}
                            />
                          </Box>
                          <Box
                            bg={
                              disabledFiles && idFiles === el.id
                                ? "#141414"
                                : "black"
                            }
                            rounded="5px"
                            px="4px"
                            mb="7px"
                            mt="7px"
                          >
                            <Input
                              borderBottom="1px solid #343434"
                              borderRight="transparent"
                              borderLeft="transparent"
                              defaultValue={el.title}
                              borderTop="transparent"
                              disabled={!deleteImg}
                              placeholder="Titel"
                              fontFamily="inter"
                              textColor="white"
                              fontWeight="700"
                              bg="transparent"
                              fontSize="15px"
                              outline="black"
                              rounded="0px"
                              name="text"
                              w="100%"
                              mb="5px"
                              h="37px"
                              pl="10px"
                              onChange={(e) => setTitle(e.target.value)}
                            />
                            <Input
                              disabled={!disabledFiles || idFiles !== el.id}
                              placeholder="Beschreibung"
                              defaultValue={item.text}
                              borderColor="transparent"
                              fontFamily="inter"
                              textColor="white"
                              bg="transparent"
                              fontWeight="300"
                              fontSize="15px"
                              outline="black"
                              rounded="0px"
                              name="text"
                              pl="10px"
                              w="100%"
                              mb="7px"
                              h="37px"
                              onChange={(e) => setText(e.target.value)}
                            />
                          </Box>
                          {deleteImg && (
                            <Box display="flex" w="100%">
                              <Button
                                color="black"
                                fontSize="13px"
                                fontWeight="700"
                                fontFamily="inter"
                                bg="white"
                                w="50%"
                                h="35px"
                                ml="2px"
                                rounded="7px"
                                onClick={() => {
                                  ActionActiveModalMedia(true);
                                  ActionActiveSubtrac(true);
                                }}
                              >
                                Mehr hinzufügen
                              </Button>
                              <Button
                                color="white"
                                fontSize="13px"
                                fontWeight="700"
                                fontFamily="inter"
                                bg="#0B6CFF"
                                w="50%"
                                h="35px"
                                ml="2px"
                                rounded="7px"
                                onClick={() => handlePutFile()}
                              >
                                Speichern
                              </Button>
                            </Box>
                          )}
                        </Box>
                      ))}
                      <Box mx="auto">
                        <Box
                          bg="#262626"
                          h="448px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <SvgBluePluse />
                        </Box>
                        <Box
                          bg="#141414"
                          rounded="5px"
                          px="4px"
                          mb="7px"
                          mt="7px"
                        >
                          <Input
                            borderBottom="1px solid #343434"
                            borderRight="transparent"
                            borderLeft="transparent"
                            borderTop="transparent"
                            defaultValue={title}
                            placeholder="Titel"
                            fontFamily="inter"
                            textColor="white"
                            bg="transparent"
                            fontWeight="700"
                            fontSize="15px"
                            outline="black"
                            rounded="0px"
                            name="text"
                            w="100%"
                            mb="5px"
                            h="37px"
                            pl="10px"
                            onChange={(e) => setTitle(e.target.value)}
                          />
                          <Input
                            placeholder="Beschreibung"
                            borderColor="transparent"
                            defaultValue={text}
                            fontFamily="inter"
                            textColor="white"
                            bg="transparent"
                            fontWeight="300"
                            fontSize="15px"
                            outline="black"
                            rounded="0px"
                            name="text"
                            pl="10px"
                            w="100%"
                            mb="7px"
                            h="37px"
                            onChange={(e) => setText(e.target.value)}
                          />
                        </Box>
                        <Box display="flex" w="100%">
                          <Button
                            color="black"
                            fontSize="13px"
                            fontWeight="700"
                            fontFamily="inter"
                            bg="white"
                            w="50%"
                            h="35px"
                            ml="2px"
                            rounded="7px"
                            onClick={() => {
                              ActionActiveModalMedia(true);
                              ActionActiveSubtrac(true);
                            }}
                          >
                            Mehr hinzufügen
                          </Button>
                          <Button
                            color="white"
                            fontSize="13px"
                            fontWeight="700"
                            fontFamily="inter"
                            bg="#0B6CFF"
                            w="50%"
                            h="35px"
                            ml="2px"
                            rounded="7px"
                            onClick={() => handlePutFile()}
                          >
                            Speichern
                          </Button>
                        </Box>
                      </Box>
                    </Slider>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>

        {!bearbeitenAkte && (
          <Box position="fixed" mx="auto" bottom="70px" px="41px" w="100%">
            <Button
              bg="#0B6CFF"
              fontSize="16px"
              fontFamily="inter"
              rounded="7px"
              h="37px"
              w="100%"
              color="white"
              onClick={() => handleClickPut()}
            >
              Speichern
            </Button>
          </Box>
        )}
      </Box>
    </Fragment>
  );
}
