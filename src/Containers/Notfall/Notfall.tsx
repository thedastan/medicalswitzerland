/* External dependencies */
import { Box, Button, Input, Spinner, Text } from "@chakra-ui/react";
import { Fragment, useState, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useParams } from "react-router";
import Slider from "react-slick";

/* Local dependencies */
import Card from "../../Components/Ui/Card/Card";
import MyButton from "../../Components/Ui/Button/Button";
import SvgDot from "../../assets/svg/SvgDot";
import API, { API_ADDRESS } from "../../Api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

import Registration from "../../Components/Registration/Registration";
import { IInterfaceUser } from "../../Components/Interface/redux/types/Types";
import { IInfoList } from "../../Components/Interface/redux-image/types/Types";
import {
  useActionsAuth,
  useActionsFile,
  useActionsForMessage,
  useActionsForModal,
  useActionsUser,
} from "../../Hooks/useActions";
import { useAppSelector } from "../../Hooks/Hooks";
import PopupForMessage from "../../Components/Ui/popups/PopupForMessage";
import SvgRedBasket from "../../assets/svg/SvgRedBasket";
import { tokenVerification } from "../../Components/Helpers/action";
import SvgBluePluse from "../../assets/svg/SvgBluePlus";
import axios from "axios";
import PopupForCard from "../../Components/Ui/Card/popyp/PopupForCard";

interface IGroupsTypes {
  id: string;
  title?: string;
  info_list?: IInfoList[];
  is_akte?: boolean;
}

export default function Notfall() {
  const { t } = useTranslation();

  const {
    ActionFilesId,
    ActionActiveModalMedia,
    ActionActiveSubtrac,
    ActionActiveProfile,
  } = useActionsForModal();
  const { ActionGetUser, ActionPutUser, ActionBearbeitenNotfall } =
    useActionsUser();
  const { ActionError, ActionErrorMessenger } = useActionsForMessage();
  const {
    ActionAllGroups,
    ActionAllGroupsForCardId,
    ActionAllGroupsPut,
    ActionGroups,
    ActionGroup,
    ActionGroupsForAkte,
    ActionGroupPut,
  } = useActionsFile();
  const { ActiveModalRegistration } = useActionsAuth();
  const { allGroups, groups } = useAppSelector((state) => state.filesReducer);
  const { modal, successPopup } = useAppSelector((state) => state.authReducer);
  const { error, loading, user, bearbeitenNotfall } = useAppSelector(
    (state) => state.userReducer
  );
  const { loading: loaderForile, group } = useAppSelector(
    (state) => state.filesReducer
  );

  const guest_id = sessionStorage.getItem("guestId") as string;

  const { id } = useParams<string>();
  const [idFile, setIdFile] = useState("");
  const [idFiles, setIdFiles] = useState("");

  const [dataPost, setDataPost] = useState<IInterfaceUser>({});
  const [names, setNames] = useState({ vorname: "", nachname: "" });

  const [deleteImg, setDeleteImg] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [disabledFiles, setDisabledFiles] = useState(false);
  const [groupId, setGroupId] = useState("");
  const [popup, setPopup] = useState(false);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const dots: any = [];

  for (let i = 0; i < 3; i++) {
    dots.push(<SvgDot key={i} />);
  }

  const inputChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  function deletedImage(data: IGroupsTypes, idInfo?: string) {
    setPopup(true);
    setIdFile(idInfo ? idInfo : "");
    setIdFiles(data.id);
  }

  async function handleClickPut() {
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
      guest_mode: false,
    });

    ActionBearbeitenNotfall(true);
  }

  function handleBearbeitenValid() {
    if (validToken) {
      ActionBearbeitenNotfall(!bearbeitenNotfall);
    } else {
      ActiveModalRegistration(true);
    }
  }

  const handleClick = (id: string, idInfo: string, data: IGroupsTypes) => {
    setGroupId(id);
    ActionFilesId(id);
    setIdFiles(id);
    setIdFile(idInfo);
    ActionGroup(data.id, idInfo);
    setDeleteImg(!deleteImg);
    setDisabledFiles(!disabledFiles);
  };

  const handlePutFile = () => {
    ActionAllGroupsPut(idFiles, {
      id: groups.id,
      title: title || groups.title,
      info_list: groups?.info_list.map((el) => el.id),
      is_akte: false,
    });
    ActionGroupPut(idFiles, group.id, {
      file_url: group.file_url,
      text: text || group.text,
      id: group.id,
    });

    ActionGroups(groups.id);
    ActionGroups(groups.id);
    setDeleteImg(false);
    ActionAllGroups();
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

  const listInput = [
    {
      item: "emergencyContact",
      name: "emergency_contact",
      value: dataPost.emergency_contact || user.emergency_contact,
      type: "text",
      placeholder: "Notfallkontact hinzufugen",
    },
    {
      item: "importTantInfo",
      name: "particularities",
      value: dataPost.particularities || user.particularities,
      type: "text",
      placeholder: "Besonderheiten hinzufugen",
    },
  ];

  useEffect(() => {
    ActionGetUser(id);
  }, []);

  useEffect(() => {
    if (validToken) {
      ActionAllGroups();
    } else {
      ActionAllGroupsForCardId(window.location.pathname.slice(6));
    }
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // dotsClass: "slick-dots custom-dots-class",
  };

  if (loading || loaderForile) {
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
      <PopupForCard
        id={idFiles}
        modal={popup}
        setModal={setPopup}
        idInfo={idFile}
      />
      <Box>
        <Box display="flex" justifyContent="end">
          {validToken && (
            <MyButton
              typeColor={!bearbeitenNotfall ? "transparent" : "darkGrey"}
              fontFamily="commissioner"
              marginRight="30px"
              color={!bearbeitenNotfall ? "black" : "white"}
              onClick={() => {
                !bearbeitenNotfall
                  ? console.log("beiten")
                  : handleBearbeitenValid();
              }}
            >
              <Trans>editProfile</Trans>
            </MyButton>
          )}
        </Box>
        <Box>
          <Box px="41px" mb="76px">
            {!bearbeitenNotfall ? (
              <Box display="flex" gap="7px">
                <Box w="100%">
                  <Text
                    color="gray"
                    fontSize="15px"
                    fontWeight="700"
                    fontFamily="inter"
                    mb="3px"
                  >
                    <Trans>firstName</Trans>
                  </Text>
                  <textarea
                    onChange={(e) =>
                      changeForName(e.target.value, names.nachname)
                    }
                    defaultValue={
                      dataPost.full_name?.split(" ")[0] ||
                      user.full_name?.split(" ")[0]
                        ? dataPost.full_name?.split(" ")[0] ||
                          user.full_name?.split(" ")[0]
                        : names.vorname
                    }
                    disabled={bearbeitenNotfall}
                    className={`textarea--notfall ${
                      !bearbeitenNotfall ? "active" : ""
                    }`}
                    style={{ textAlign: "center", paddingTop: "17px" }}
                  />
                </Box>
              </Box>
            ) : (
              <Box gap="7px" w="100% ">
                <Text
                  color="gray"
                  fontSize="15px"
                  fontWeight="700"
                  fontFamily="inter"
                  mb="3px"
                  textAlign="start"
                >
                  NAME
                </Text>
                <textarea
                  name="full_name"
                  disabled={bearbeitenNotfall}
                  onChange={(e) => inputChangeTextArea(e)}
                  defaultValue={
                    dataPost.full_name?.split(" ")[0] ||
                    user.full_name?.split(" ")[0] ||
                    ""
                  }
                  className={`textarea--notfall ${
                    !bearbeitenNotfall ? "active" : ""
                  }`}
                />
              </Box>
            )}
            {listInput?.map((el, index) => (
              <Box key={index}>
                <Text
                  color="gray"
                  fontSize="15px"
                  fontWeight="700"
                  fontFamily="inter"
                  mb="3px"
                >
                  <Trans>{el.item}</Trans>
                </Text>
                <textarea
                  name={el.name}
                  onChange={(e) => inputChangeTextArea(e)}
                  defaultValue={el.value ? el.value : ""}
                  disabled={bearbeitenNotfall}
                  placeholder={!bearbeitenNotfall ? el.placeholder : ""}
                  className={`textarea--notfall ${
                    !bearbeitenNotfall ? "active" : ""
                  }`}
                />
              </Box>
            ))}
            <Text
              color="gray"
              fontSize="15px"
              fontWeight="700"
              fontFamily="inter"
              mb="3px"
              textAlign="start"
            >
              <Trans>allergies</Trans>
            </Text>
            <textarea
              name="allergies_text"
              onChange={(e) => inputChangeTextArea(e)}
              defaultValue={user.allergies_text ? user.allergies_text : ""}
              disabled={bearbeitenNotfall}
              className={`textarea--allergia ${
                !bearbeitenNotfall ? "active" : ""
              }`}
            />
          </Box>
          <Box px="10px">
            <Box display="flex" flexDir="column-reverse">
              {allGroups
                .filter((elem) => elem.is_akte === false)
                .map((el) => (
                  <Box key={el.id} maxW="372px" mx="auto">
                    <Box mb="53px">
                      <Slider {...settings}>
                        {el?.info_list.map((item, index) => (
                          <Box key={index}>
                            <Box
                              position="relative"
                              alignItems="center"
                              display="flex"
                              bg="#131313"
                              maxW="426px"
                              mx="auto"
                              h="448px"
                            >
                              {validToken && (
                                <Button
                                  position="absolute"
                                  display="flex"
                                  right="11px"
                                  top="17px"
                                  zIndex="5"
                                  ml="auto"
                                  w="30px"
                                  h="10px"
                                  px="0"
                                  onClick={() => {
                                    handleClick(el.id, item.id, el);
                                    setGroupId(el.id);
                                  }}
                                >
                                  {dots}
                                </Button>
                              )}
                              {groupId === el.id && deleteImg && (
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
                                      ActionActiveProfile(false);
                                      ActionActiveSubtrac(true);
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
                              <Box
                                w="100%"
                                mb="7px"
                                onClick={() => handleViewImage(el.id)}
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
                            {groupId === el.id && deleteImg && (
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
                        {deleteImg && (
                          <Box mx="auto">
                            <Box
                              bg="#262626"
                              h="448px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              onClick={() => {
                                ActionFilesId(groupId);
                                ActionActiveModalMedia(true);
                                ActionActiveSubtrac(true);
                                ActionActiveProfile(false);
                              }}
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
                          </Box>
                        )}
                      </Slider>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
        {!bearbeitenNotfall && (
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
      {modal && (
        <Box
          pos="fixed"
          top="0"
          bottom="0"
          left="0"
          right="0"
          display="flex"
          alignItems="center"
        >
          <Registration />
        </Box>
      )}
      {successPopup && <PopupForMessage />}
    </Fragment>
  );
}
