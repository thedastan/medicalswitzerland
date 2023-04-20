/* External dependencies */
import axios from "axios";
import { Box, Button, Input, Spinner, Text, Textarea } from "@chakra-ui/react";
import { Fragment, useState, useEffect, useRef } from "react";
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
import PopupChangeFile from "../popupChangeFile/PopupChangeFile";
import PopupForMessage from "../../Components/Ui/popups/PopupForMessage";

interface IGroupsTypes {
  id: string;
  title?: string;
  info_list?: IInfoList[];
  is_akte?: boolean;
}

export default function Notfall() {
  const refDate = useRef() as React.MutableRefObject<HTMLInputElement>;
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
  } = useActionsFile();
  const { ActiveModalRegistration, ActiveModalSuccess } = useActionsAuth();
  const {
    allGroups,
    groups,
    loading: loader,
  } = useAppSelector((state) => state.filesReducer);
  const { modal, successPopup } = useAppSelector((state) => state.authReducer);
  const { error, loading, user, bearbeitenNotfall } = useAppSelector(
    (state) => state.userReducer
  );
  const loaderForile = useAppSelector((state) => state.filesReducer.loading);

  const { id } = useParams<string>();
  const [idFile, setIdFile] = useState("");
  const [idFiles, setIdFiles] = useState("");

  const [dataPost, setDataPost] = useState<IInterfaceUser>({});
  const [dataPutFiles, setDataPutFiles] = useState<IGroupsTypes>({ id: "" });
  const [modalChange, setModalChange] = useState(false);

  const [deleteImg, setDeleteImg] = useState(false);
  const [validToken, setValidToken] = useState<boolean>();
  const [disabledFiles, setDisabledFiles] = useState(false);

  const dots = [];

  for (let i = 0; i < 3; i++) {
    dots.push(<SvgDot key={i} />);
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };

  const inputChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };

  const inputChangeForFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPutFiles({ ...dataPutFiles, [e.target.name]: e.target.value });
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

  function handleClickPutFiles(id: string) {
    if (groups.id) {
      ActionAllGroupsPut(idFiles, {
        id: id,
        title: dataPutFiles.title || groups.title,
        info_list: groups?.info_list.map((el) => el.id),
        is_akte: false,
      });
      setDisabledFiles(false);
    }
    getIdForFiles(id);
    setDisabledFiles(!disabledFiles);
  }

  function getIdForFiles(id: string) {
    ActionGroups(id);
    setIdFiles(id);
  }

  function getIdForFile(data: IGroupsTypes, id: string) {
    ActionGroup(data.id, id);
    setModalChange(true);
    setIdFile(data.id);
  }

  function handleBearbeitenValid() {
    if (!validToken) {
      ActionBearbeitenNotfall(!bearbeitenNotfall);
    } else {
      ActiveModalRegistration(true);
    }
  }

  const handleClick = (id: string) => {
    ActionActiveModalMedia(true);
    ActionActiveProfile(false);
    ActionActiveSubtrac(true);
    ActionFilesId(id);
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
    // {
    //   item: "GEBURTSDATUM",
    //   name: "birth_date",
    //   value: user.birth_date,
    //   type: "date",
    //   placeholder: "Geburtsdatum hinzufugen",
    // },
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

  // useEffect(() => {
  //   if (successPopup) {
  //     setTimeout(() => {
  //       ActiveModalSuccess(false);
  //     }, 3000);
  //   }
  // }, [successPopup]);

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
      <Box display="flex" justifyContent="end">
        <MyButton
          typeColor={!bearbeitenNotfall ? "white" : "darkGrey"}
          fontFamily="commissioner"
          marginRight="30px"
          color={!bearbeitenNotfall ? "black" : "white"}
          onClick={() =>
            !bearbeitenNotfall ? handleClickPut() : handleBearbeitenValid()
          }
        >
          {!bearbeitenNotfall ? "SAVE" : "Bearbeiten"}
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
              <input
                defaultValue={el.value ? el.value : ""}
                disabled={bearbeitenNotfall}
                placeholder={!bearbeitenNotfall ? el.placeholder : ""}
                type={el.type}
                onChange={(e) => e && inputChange(e)}
                className={`input--notfall ${
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

            <input
              onFocus={onFocus}
              onBlur={onBlur}
              defaultValue={user.birth_date ? user.birth_date : ""}
              disabled={bearbeitenNotfall}
              placeholder={!bearbeitenNotfall ? "Geburtsdatum hinzufugen" : ""}
              type={hasValue || focus ? "date" : "text"}
              onChange={(e) => {
                e && inputChange(e);
                if (e.target.value) setHasValue(true);
                else setHasValue(false);
              }}
              className={`input--notfall ${!bearbeitenNotfall ? "active" : ""}`}
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
              <input
                defaultValue={el.value ? el.value : ""}
                disabled={bearbeitenNotfall}
                placeholder={!bearbeitenNotfall ? el.placeholder : ""}
                type={el.type}
                onChange={(e) => e && inputChange(e)}
                className={`input--notfall ${
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
          {allGroups.filter((el) => el.is_akte === false).length && (
            <Button
              display="flex"
              mb="11px"
              mt="46px"
              w="30px"
              px="0"
              ml="auto"
              onClick={() =>
                validToken
                  ? ActiveModalRegistration(true)
                  : setDeleteImg(!deleteImg)
              }
            >
              {dots}
            </Button>
          )}
          {!loader ? (
            <Box display="flex" flexDir="column-reverse">
              {allGroups
                .filter((elem) => elem.is_akte === false)
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
                        fontSize="10px"
                        fontFamily="inter"
                        mb="5px"
                        defaultValue={el.title}
                        outline="black"
                        rounded="0px"
                        h="37px"
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
                            color={
                              disabledFiles && el.id === idFiles
                                ? "black"
                                : "white"
                            }
                            fontSize="10px"
                            fontWeight="700"
                            fontFamily="inter"
                            bg={
                              disabledFiles && el.id === idFiles
                                ? "white"
                                : "#1A1A1A"
                            }
                            w="50%"
                            h="37px"
                            mr="2px"
                            rounded="0px"
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
                            color="white"
                            fontSize="10px"
                            fontWeight="700"
                            fontFamily="inter"
                            bg="#1A1A1A"
                            w="50%"
                            h="37px"
                            ml="2px"
                            rounded="0px"
                            onClick={() => handleClick(el.id)}
                          >
                            Add image
                          </Button>
                        )}
                      </Box>
                    </Box>
                    <Box mb="53px">
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

      <Box display="flex" justifyContent="center">
        <PopupChangeFile
          idFile={idFile}
          modal={modalChange}
          setModal={setModalChange}
          // setDeleteCenceled={setDeleteImg}
        />
      </Box>
    </Fragment>
  );
}
