/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { Button, Input, Spinner } from "@chakra-ui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Slider from "react-slick";
import { Trans, useTranslation } from "react-i18next";

/* Local dependencies */
import SvgDot from "../../assets/svg/SvgDot";
import Card from "../../Components/Ui/Card/Card";
import MyButton from "../../Components/Ui/Button/Button";
import API, { API_ADDRESS } from "../../Api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

import {
  useActionsFile,
  useActionsForMessage,
  useActionsForModal,
  useActionsUser,
} from "../../Hooks/useActions";
import { useAppSelector } from "../../Hooks/Hooks";
import { IInterfaceUser } from "../../Components/Interface/redux/types/Types";
import {
  IGroupsTypes,
  IInfoList,
} from "../../Components/Interface/redux-image/types/Types";
import SvgBluePluse from "../../assets/svg/SvgBluePlus";
import SvgRedBasket from "../../assets/svg/SvgRedBasket";
import { tokenVerification } from "../../Components/Helpers/action";
import axios from "axios";

interface IGroupType {
  id: string;
  title?: string;
  info_list?: IInfoList[];
  is_akte?: boolean;
}

export default function Akte() {
  const { t } = useTranslation();
  const textareaRef = useRef(null);

  const {
    ActionFilesId,
    ActionActiveModalMedia,
    ActionActiveSubtrac,
    ActionActiveProfile,
  } = useActionsForModal();
  const { ActionGetUser, ActionPutUser, ActionBearbeitenAkte } =
    useActionsUser();
  const { ActionError, ActionErrorMessenger } = useActionsForMessage();
  const {
    ActionAllGroups,
    ActionAllGroupsPut,
    ActionGroups,
    ActionGroup,
    ActionGroupsForAkte,
    ActionGroupsForGuest,
    ActionGroupPut,
  } = useActionsFile();

  const { allGroups, groups, group } = useAppSelector(
    (state) => state.filesReducer
  );

  const { bearbeitenAkte, loading, user, error } = useAppSelector(
    (state) => state.userReducer
  );

  const { id } = useParams<string>();
  const [idFile, setIdFile] = useState("");
  const [idFiles, setIdFiles] = useState("");
  const [back, setBack] = useState(false);

  const [dataPost, setDataPost] = useState<IInterfaceUser>({});
  const [deleteImg, setDeleteImg] = useState(false);
  const [names, setNames] = useState({ vorname: "", nachname: "" });
  const [validToken, setValidToken] = useState(false);

  const [disabledFiles, setDisabledFiles] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const guest_id = sessionStorage.getItem("guestId") as string;

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
      item: "allergies",
      name: "allergies",
      value: user.allergies,
    },
    {
      item: "diagnosen",
      name: "why_diagnose",
      value: user.why_diagnose,
    },
    {
      item: "operationen",
      name: "operation",
      value: user.operation,
    },
    {
      item: "medicamentPlan",
      name: "medications",
      value: user.medications,
    },
    {
      item: "nebenDiagnosen",
      name: "profession",
      value: user.profession,
    },
    {
      item: "location",
      name: "location",
      value: user.location,
    },
  ];

  const inputChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;

    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };

  function changeForName(vor: string, nach: string) {
    setNames({ ...names, nachname: nach, vorname: vor });

    setDataPost({
      ...dataPost,
      full_name: `${vor || user.full_name?.split(" ")[0] || names.vorname} ${
        nach || user.full_name?.split(" ")[1] || names.nachname
      }`,
    });
  }

  function deletedImage(data: IGroupType, idInfo?: string) {
    API.delete(`groups/${data?.id}/info/${idInfo}/`)
      .then(() => {
        ActionGetUser(id);
        ActionAllGroups();
        ActionGroups(data?.id);
      })
      .catch((e) => {
        ActionError(true);
        ActionErrorMessenger(e);
      });
  }

  function handleClickPut() {
    ActionBearbeitenAkte(!bearbeitenAkte);
    ActionPutUser(window.location.pathname.slice(6), {
      allergies: dataPost.allergies || user.allergies,
      allergies_text: dataPost.allergies_text || user.allergies_text,
      avatar: dataPost.avatar || user.avatar?.slice(6) || "",
      card_id: user.card_id || id,
      contact: dataPost.contact || user.contact || "",
      email: dataPost.email || user.email,
      birth_date: dataPost.birth_date || user.birth_date || null,

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

  const BackSpaceFn = (e: any) => {
    e.key === "Backspace" ? setBack(true) : setBack(false);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const regex = /^[0-9\b]+$/;

    let value = e.target.value;

    if (value === "" || regex.test(value)) {
      if (value.length === 4 && back === false) {
        value += "-";
      } else if (value.length === 7 && back === false) {
        value += "-";
      }
    }
    setDataPost({ ...dataPost, [e.target.name]: value });
  };

  const handleClick = (id: string, idInfo: string, data: IGroupsTypes) => {
    setDisabledFiles(!disabledFiles);
    ActionGroup(data.id, idInfo);
    setDeleteImg(!deleteImg);
    setIdFile(idInfo);
    ActionFilesId(id);
    setIdFiles(id);
  };

  const handlePutFile = () => {
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

  const handleViewImage = (id: string) => {
    let idGroup = sessionStorage.getItem(`${id}`);

    Number(idGroup) === Number(id)
      ? console.log("Block")
      : axios.post(`${API_ADDRESS}groups/${id}/view/?g_id=${guest_id}`);

    setTimeout(() => {
      sessionStorage.setItem(`${id}`, id);
    }, 500);

    setTimeout(() => {
      sessionStorage.removeItem(`${idGroup}`);
    }, 60 * 60 * 1000);
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

  useEffect(() => {
    tokenVerification(setValidToken);
  }, []);

  useEffect(() => {
    ActionGroupsForGuest(window.location.pathname.slice(6), guest_id);
  }, []);

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
          <Trans>patientRecord</Trans>
        </Text>

        <Text color="#C7C4C4" textAlign="center" fontSize="18px" mb="35px">
          medical
          <span style={{ color: "#E11F26" }}>switzerland</span>
        </Text>

        <Box
          display="flex"
          justifyContent="end"
          pb="11px"
          borderBottom="1px solid #454545"
          mb="29px"
        >
          {validToken && (
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
              {!bearbeitenAkte ? "SAVE" : <Trans>editProfile</Trans>}
            </MyButton>
          )}
        </Box>

        <Box px="12px">
          {!bearbeitenAkte ? (
            <Box display="flex" gap="7px">
              <Box w="50%">
                <Text
                  color="gray"
                  fontSize="14px"
                  fontWeight="700"
                  fontFamily="inter"
                  mb="10px"
                >
                  <Trans>fristName</Trans>
                </Text>
                <textarea
                  onChange={(e) =>
                    changeForName(e.target.value, names.nachname)
                  }
                  defaultValue={
                    user.full_name?.split(" ")[0]
                      ? user.full_name?.split(" ")[0]
                      : names.vorname
                  }
                  disabled={bearbeitenAkte}
                  className={`textarea--notfall ${
                    !bearbeitenAkte ? "active" : ""
                  }`}
                  style={{ textAlign: "center", paddingTop: "25px" }}
                />
              </Box>
              <Box w="50%">
                <Text
                  color="gray"
                  fontSize="14px"
                  fontWeight="700"
                  fontFamily="inter"
                  mb="10px"
                >
                  <Trans>lastName</Trans>
                </Text>
                <textarea
                  onChange={(e) => changeForName(names.vorname, e.target.value)}
                  defaultValue={
                    user.full_name?.split(" ")[1]
                      ? user.full_name?.split(" ")[1]
                      : names.nachname
                  }
                  disabled={bearbeitenAkte}
                  className={`textarea--notfall ${
                    !bearbeitenAkte ? "active" : ""
                  }`}
                  style={{ textAlign: "center", paddingTop: "25px" }}
                />
              </Box>
            </Box>
          ) : (
            <Box gap="7px" w="100% ">
              <Box borderBottom="1px solid #454545" marginBottom="29px">
                <Text
                  color="gray"
                  fontSize="14px"
                  fontWeight="700"
                  fontFamily="inter"
                  mb="10px"
                  textAlign="center"
                >
                  NAME
                </Text>
                <textarea
                  name="full_name"
                  ref={textareaRef}
                  disabled={bearbeitenAkte}
                  onChange={(e) => inputChange(e)}
                  defaultValue={user.full_name ? user.full_name : ""}
                  placeholder={!bearbeitenAkte ? "Name hinzufugen" : ""}
                  className={`textarea--akte ${
                    !bearbeitenAkte ? "active" : ""
                  }`}
                />
              </Box>
            </Box>
          )}

          <Box>
            <Text
              color="gray"
              fontSize="14px"
              fontWeight="700"
              fontFamily="inter"
              mb="10px"
              textAlign="center"
            >
              <Trans>dateOfBrith</Trans>
            </Text>

            <textarea
              name="birth_date"
              defaultValue={
                dataPost.birth_date
                  ? dataPost.birth_date
                  : user.birth_date || ""
              }
              maxLength={10}
              disabled={bearbeitenAkte}
              placeholder={!bearbeitenAkte ? "Geburtsdatum hinzufugen" : ""}
              className={`textarea--akte ${!bearbeitenAkte ? "active" : ""}`}
              onChange={(e) => handleBirthDateChange(e)}
              onKeyDown={(e) => BackSpaceFn(e)}
            />
          </Box>

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
                fontSize="14px"
                fontWeight="700"
                fontFamily="inter"
                mb="15px"
                mt="10px"
                textAlign="center"
              >
                <Trans>{el.item}</Trans>
              </Text>
              <textarea
                name={el.name}
                ref={textareaRef}
                disabled={bearbeitenAkte}
                onChange={(e) => inputChange(e)}
                defaultValue={el.value ? el.value : ""}
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
                            {validToken && (
                              <Button
                                position="absolute"
                                display="flex"
                                w="30px"
                                h="14px"
                                px="0"
                                ml="auto"
                                top="17px"
                                right="11px"
                                zIndex="5"
                                onClick={() => handleClick(el.id, item.id, el)}
                              >
                                {dots}
                              </Button>
                            )}
                            {deleteImg && (
                              <Box
                                bg="rgba(57, 57, 57, 0.5)"
                                w="64px"
                                h="190px"
                                alignItems="center"
                                pos="absolute"
                                display="flex"
                                flexDir="column"
                                rounded="5px"
                                right="5px"
                                top="40px"
                                zIndex="5"
                              >
                                <Box
                                  justifyContent="center"
                                  alignItems="center"
                                  pos="absolute"
                                  display="flex"
                                  rounded="50%"
                                  right="11px"
                                  top="25px"
                                  bg="black"
                                  zIndex="5"
                                  w="39px"
                                  h="39px"
                                  onClick={() => deletedImage(el, item.id)}
                                >
                                  <SvgRedBasket />
                                </Box>
                                <Text
                                  fontSize="10px"
                                  fontWeight="300"
                                  textColor="white"
                                  fontFamily="inter"
                                  pos="absolute"
                                  right="16px"
                                  top="71px"
                                >
                                  Delete
                                </Text>
                                <Box
                                  justifyContent="center"
                                  alignItems="center"
                                  pos="absolute"
                                  display="flex"
                                  rounded="50%"
                                  right="11px"
                                  top="100px"
                                  bg="black"
                                  zIndex="5"
                                  w="39px"
                                  h="39px"
                                  onClick={() => {
                                    ActionActiveModalMedia(true);
                                    ActionActiveSubtrac(true);
                                    ActionActiveProfile(false);
                                  }}
                                >
                                  <SvgBluePluse />
                                </Box>
                                <Text
                                  fontSize="10px"
                                  fontWeight="300"
                                  textColor="white"
                                  fontFamily="inter"
                                  pos="absolute"
                                  right="9px"
                                  top="145px"
                                >
                                  <Trans>addMore</Trans>
                                </Text>
                              </Box>
                            )}
                            <Card key={index} el={item} />
                            <Box
                              onClick={() => handleViewImage(el.id)}
                              mb="7px"
                            >
                              <Card key={index} el={item} />
                            </Box>
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
                            mt="14px"
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
                                color="white"
                                fontSize="13px"
                                fontWeight="700"
                                fontFamily="inter"
                                bg="#0B6CFF"
                                w="100%"
                                h="35px"
                                ml="2px"
                                rounded="7px"
                                onClick={() => handlePutFile()}
                              >
                                <Trans>done</Trans>
                              </Button>
                            </Box>
                          )}
                        </Box>
                      ))}
                      {validToken && (
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
                                  ActionFilesId("");
                                  ActionActiveSubtrac(true);
                                  ActionActiveProfile(false);
                                  ActionActiveModalMedia(true);
                                }}
                              >
                                <Trans>addMore</Trans>
                              </Button>
                              <Button
                                color="white"
                                fontSize="13px"
                                fontWeight="700"
                                fontFamily="inter"
                                bg="#0B6CFF"
                                w="100%"
                                h="35px"
                                ml="2px"
                                rounded="7px"
                                onClick={() => handlePutFile()}
                              >
                                <Trans>done</Trans>
                              </Button>
                            </Box>
                          )}
                        </Box>
                      )}
                    </Slider>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>

        {!bearbeitenAkte && (
          <Box position="fixed" mx="auto" bottom="100px" px="41px" w="100%">
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
              <Trans>done</Trans>
            </Button>
          </Box>
        )}
      </Box>
    </Fragment>
  );
}
