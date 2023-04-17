/* External dependencies */
import axios from "axios";
import { Box, Button, Input, Spinner, Text } from "@chakra-ui/react";
import { Fragment, useState, useEffect } from "react";
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
  const { ActionGetUser, ActionPutUser, ActionBearbeiten } = useActionsUser();
  const {
    ActionAllGroups,
    ActionAllGroupsForCardId,
    ActionAllGroupsPut,
    ActionGroups,
    ActionGroup,
  } = useActionsFile();
  const { ActiveModalRegistration } = useActionsAuth();
  const {
    allGroups,
    groups,
    loading: loader,
  } = useAppSelector((state) => state.filesReducer);
  const { modal } = useAppSelector((state) => state.authReducer);
  const { error, loading, user, bearbeiten } = useAppSelector(
    (state) => state.userReducer
  );

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

  const listInput = [
    {
      item: "NAME",
      name: "full_name",
      value: user.full_name,
    },
    {
      item: "BILDUNTERSCHRIFT VERFASSEN",
      name: "medications",
      value: user.medications,
    },
    {
      item: "GEBURTSDATUM",
      name: "birth_date",
      value: user.birth_date,
    },
    {
      item: "ALLERGIE",
      name: "allergies_text",
      value: user.allergies_text,
    },
    {
      item: "NOTFALLKONTAKT",
      name: "emergency_contact",
      value: user.emergency_contact,
    },
    {
      item: "BESONDERHEITEN",
      name: "particularities",
      value: user.particularities,
    },
  ];

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };

  const inputChangeForFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPutFiles({ ...dataPutFiles, [e.target.name]: e.target.value });
  };

  function deletedImage(data?: IGroupsTypes, idInfo?: string) {
    API.delete(`groups/${data?.id}/info/${idInfo}/`)
      .then(() => {
        ActionGetUser(id);
        ActionAllGroups();
      })
      .catch((e) => {
        alert(`${e} Error`);
      });
  }

  function handleClickPut() {
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
    ActionBearbeiten(true);
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
      ActionBearbeiten(!bearbeiten);
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

  useEffect(() => {
    ActionGetUser(id);
  }, []);

  useEffect(() => {
    ActionAllGroups();
  }, []);

  useEffect(() => {
    axios
      .post(`${API_ADDRESS}users/auth/verify/`, { token: getAccessToken() })
      .then(() => {
        ActionAllGroups();
        setValidToken(false);
      })
      .catch((e) => {
        ActionAllGroupsForCardId(id);
        setValidToken(true);
      });
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
      <Box display="flex" justifyContent="end">
        <MyButton
          typeColor={!bearbeiten ? "white" : "darkGrey"}
          fontFamily="commissioner"
          marginRight="30px"
          color={!bearbeiten ? "black" : "white"}
          onClick={() =>
            !bearbeiten ? handleClickPut() : handleBearbeitenValid()
          }
        >
          {!bearbeiten ? "SAVE" : "Bearbeiten"}
        </MyButton>
      </Box>
      <Box>
        <Box px="41px">
          {listInput?.map((el, index) => (
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
              <MyInput
                onChange={(e) => e && inputChange(e)}
                name={el.name}
                marginBottom="19px"
                rounded="0px"
                color="white"
                defaultValue={el.value ? el.value : ""}
                disabled={bearbeiten}
                typeColor={!bearbeiten ? "colorForActiveInput" : "black"}
              />
            </Box>
          ))}
        </Box>
        <Box px="10px">
          {allGroups && (
            <Box
              display="flex"
              mb="11px"
              mt="46px"
              py="10px"
              gap="2px"
              w="32px"
              ml="auto"
              onClick={() =>
                validToken
                  ? ActiveModalRegistration(true)
                  : setDeleteImg(!deleteImg)
              }
            >
              {dots}
            </Box>
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
