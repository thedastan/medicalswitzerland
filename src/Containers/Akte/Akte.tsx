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
    ActionGroupsForAkte,
    ActionGroup,
  } = useActionsFile();
  const {
    allGroups,
    groups,
    loading: loader,
  } = useAppSelector((state) => state.filesReducer);
  const { bearbeitenAkte, loading, user, error } = useAppSelector(
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
        <Input
          mb="30px"
          fontSize="14px"
          color="white"
          name="full_name"
          placeholder="Name"
          value={dataPost.full_name || user.full_name || ""}
          textAlign="center"
          type="text"
          bg="black"
          rounded="0px"
          borderColor="black"
          disabled
        />
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
          typeColor={!bearbeitenAkte ? "white" : "darkGrey"}
          fontFamily="commissioner"
          marginRight="16px"
          color={!bearbeitenAkte ? "black" : "white"}
          onClick={() =>
            !bearbeitenAkte
              ? handleClickPut()
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

        {allGroups.filter((el) => el.is_akte === true).length && (
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

        <Box display="flex" flexDir="column-reverse">
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
                          disabledFiles && el.id === idFiles ? "black" : "white"
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
      </Box>
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
