/* External dependencies */
import axios from "axios";
import { Box, Button, Input, Spinner, Text, Textarea } from "@chakra-ui/react";
import {
  Fragment,
  useState,
  useEffect,
  useRef,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
} from "react";
import { useParams } from "react-router";
import Slider from "react-slick";

/* Local dependencies */
import Card from "../../Components/Ui/Card/Card";
import MyButton from "../../Components/Ui/Button/Button";
import MyInput from "../../Components/Ui/Input/Input";
import SvgDot from "../../assets/svg/SvgDot";
import API, { API_ADDRESS } from "../../Api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

import Registration from "../../Components/Registration/Registration";
import { IInterfaceUser } from "../../Components/Interface/redux/types/Types";
import { IInfoList } from "../../Components/Interface/redux-image/types/Types";
import { getAccessToken } from "../../Components/Helpers";
import {
  useActionsAuth,
  useActionsFile,
  useActionsForModal,
  useActionsUser,
} from "../../Hooks/useActions";
import { useAppSelector } from "../../Hooks/Hooks";
import PopupForMessage from "../../Components/Ui/popups/PopupForMessage";
import SvgRedBasket from "../../assets/svg/SvgRedBasket";

interface IGroupsTypes {
  id: string;
  title?: string;
  info_list?: IInfoList[];
  is_akte?: boolean;
}

export default function Notfall() {
  const {
    ActionFilesId,
    ActionActiveModalMedia,
    ActionActiveSubtrac,
    ActionActiveProfile,
  } = useActionsForModal();
  const { ActionGetUser, ActionPutUser, ActionBearbeitenNotfall } =
    useActionsUser();
  const {
    ActionAllGroups,
    ActionAllGroupsForCardId,
    ActionAllGroupsPut,
    ActionGroups,
    ActionGroup,
    ActionGroupsForAkte,
    ActionGroupPut,
    ActionGroupsInfo,
  } = useActionsFile();
  const { ActiveModalRegistration } = useActionsAuth();
  const {
    allGroups,
    groups,
    loading: loader,
  } = useAppSelector((state) => state.filesReducer);
  const { modal, successPopup } = useAppSelector((state) => state.authReducer);
  const { error, loading, user, bearbeitenNotfall } = useAppSelector(
    (state) => state.userReducer
  );
  const { loading: loaderForile, group } = useAppSelector(
    (state) => state.filesReducer
  );

  const { id } = useParams<string>();
  const [idFile, setIdFile] = useState("");
  const [idFiles, setIdFiles] = useState("");

  const [dataPost, setDataPost] = useState<IInterfaceUser>({});

  const [deleteImg, setDeleteImg] = useState(false);
  const [validToken, setValidToken] = useState<boolean>();
  const [disabledFiles, setDisabledFiles] = useState(false);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const dots: any = [];

  for (let i = 0; i < 3; i++) {
    dots.push(<SvgDot key={i} />);
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };

  const inputChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };

  function deletedImage(data?: IGroupsTypes, idInfo?: string) {
    API.delete(`groups/${data?.id}/info/${idInfo}/`)
      .then(() => {
        ActionGetUser(id);
        // ActionAllGroups();
      })
      .catch((e) => {
        alert(`${e} Error`);
      });
  }

  function handleClickPut() {
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

    ActionBearbeitenNotfall(true);
  }

  function handleBearbeitenValid() {
    if (!validToken) {
      ActionBearbeitenNotfall(!bearbeitenNotfall);
    } else {
      ActiveModalRegistration(true);
    }
  }

  const handleClick = (id: string, idInfo: string, data: IGroupsTypes) => {
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
    ActionAllGroups();
    setText("");
    // setDeleteCenceled(false);
  };

  const listInput = [
    {
      item: "NAME",
      name: "full_name",
      value: user.full_name,
      type: "text",
      placeholder: "Name hinzufugen",
    },
    {
      item: "BILDUNTERSCHRIFT VERFASSEN",
      name: "contact",
      value: user.contact,
      type: "text",
    },
    {
      item: "NOTFALLKONTAKT",
      name: "emergency_contact",
      value: user.emergency_contact,
      type: "text",
      placeholder: "Notfallkontact hinzufugen",
    },
    {
      item: "BESONDERHEITEN",
      name: "particularities",
      value: user.particularities,
      type: "text",
      placeholder: "Besonderheiten hinzufugen",
    },
  ];

  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  useEffect(() => {
    ActionGetUser(id);
  }, []);

  useEffect(() => {
    if (!validToken) {
      ActionAllGroups();
    } else {
      ActionAllGroupsForCardId(window.location.pathname.slice(6));
    }
  }, []);

  useEffect(() => {
    axios
      .post(`${API_ADDRESS}users/auth/verify/`, { token: getAccessToken() })
      .then(() => {
        // ActionAllGroups();
        setValidToken(false);
      })
      .catch((e) => {
        ActionAllGroupsForCardId(id);
        setValidToken(true);
      });
  }, []);

  useEffect(() => {
    if (idFile) {
      ActionGroups(idFile);
      ActionGroupsForAkte(idFile);
    }
  }, [idFile]);

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
      <Box pos="relative">
        <Box display="flex" justifyContent="end">
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
            Bearbeiten
          </MyButton>
        </Box>
        <Box>
          <Box px="41px">
            {listInput?.slice(0, 2).map((el, index) => (
              <Box key={index}>
                <Text
                  color="gray"
                  fontSize="10px"
                  fontWeight="700"
                  fontFamily="inter"
                  mb="3px"
                >
                  {el.item}
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
            <Box>
              <Text
                color="gray"
                fontSize="10px"
                fontWeight="700"
                fontFamily="inter"
                mb="3px"
              >
                GEBURTSDATUM
              </Text>

              <textarea
                defaultValue={user.birth_date ? user.birth_date : ""}
                disabled={bearbeitenNotfall}
                placeholder={
                  !bearbeitenNotfall ? "Geburtsdatum hinzufugen" : ""
                }
                onChange={(e) => inputChangeTextArea(e)}
                className={`textarea--notfall ${
                  !bearbeitenNotfall ? "active" : ""
                }`}
              />
            </Box>
            {listInput?.slice(2).map((el, index) => (
              <Box key={index}>
                <Text
                  color="gray"
                  fontSize="10px"
                  fontWeight="700"
                  fontFamily="inter"
                  mb="3px"
                >
                  {el.item}
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
              fontSize="10px"
              fontWeight="700"
              fontFamily="inter"
              mb="3px"
              textAlign="start"
            >
              ALLERGIE
            </Text>
            <textarea
              name="allergies_text"
              onChange={(e) => inputChangeTextArea(e)}
              defaultValue={user.allergies_text ? user.allergies_text : ""}
              disabled={bearbeitenNotfall}
              placeholder={!bearbeitenNotfall ? "Allergie hinzufugen" : ""}
              className={`textarea--notfall ${
                !bearbeitenNotfall ? "active" : ""
              }`}
            />
          </Box>
          <Box px="10px">
            {!loader ? (
              <Box display="flex" flexDir="column-reverse">
                {allGroups
                  .filter((elem) => elem.is_akte === false)
                  .map((el) => (
                    <Box key={el.id} maxW="372px" mx="auto">
                      <Box mb="53px">
                        <Slider {...settings}>
                          {el?.info_list.map((item, index) => (
                            <Box>
                              <Box
                                position="relative"
                                alignItems="center"
                                display="flex"
                                bg="#131313"
                                maxW="426px"
                                mx="auto"
                                h="448px"
                              >
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
                                  onClick={() =>
                                    handleClick(el.id, item.id, el)
                                  }
                                >
                                  {dots}
                                </Button>
                                {deleteImg && (
                                  <Box
                                    justifyContent="center"
                                    alignItems="center"
                                    pos="absolute"
                                    display="flex"
                                    rounded="50%"
                                    right="17px"
                                    top="51px"
                                    bg="black"
                                    zIndex="5"
                                    w="30px"
                                    h="30px"
                                    onClick={() => deletedImage(el, el.id)}
                                  >
                                    <SvgRedBasket />
                                  </Box>
                                )}
                                <Box w="100%">
                                  <Card
                                    key={index}
                                    el={item}
                                    deleteImg={deleteImg}
                                    object={el}
                                  />
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
                        </Slider>
                      </Box>
                    </Box>
                  ))}
              </Box>
            ) : (
              <Box textColor="white" display="flex" justifyContent="center">
                <Spinner />
              </Box>
            )}
          </Box>
        </Box>
        {!bearbeitenNotfall && (
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
