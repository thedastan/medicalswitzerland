/* External dependencies */
import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

/* Local dependencies */
import Card from "../../Components/Ui/Card/Card";
import MyButton from "../../Components/Ui/Button/Button";
import MyInput from "../../Components/Ui/Input/Input";
import SvgDot from "../../assets/svg/SvgDot";
import API, { API_ADDRESS } from "../../Api";

import Registration from "../../Components/Registration/Registration";
import { IInterfaceUser } from "../../Components/Interface/redux/types/Types";
import { IGroupsTypes } from "../../Components/Interface/redux-image/types/Types";
import { ActionFilesId } from "../../Components/Interface/popup/redux-for-modal/action/Action";
import { getAccessToken } from "../../Components/Helpers";
import {
  useActionsAuth,
  useActionsFile,
  useActionsForModal,
  useActionsUser,
} from "../../Hooks/useActions";
import { useAppSelector } from "../../Hooks/Hooks";

export default function Notfall() {
  const {
    ActionFilesId,
    ActionActiveModalMedia,
    ActionActiveSubtrac,
    ActionActiveProfile,
  } = useActionsForModal();
  const { ActionGetUser, ActionPutUser, ActionBearbeiten } = useActionsUser();
  const { ActionAllGroups, ActionAllGroupsForCardId } = useActionsFile();
  const { ActiveModalRegistration } = useActionsAuth();
  const { allGroups } = useAppSelector((state) => state.filesReducer);
  const { modal } = useAppSelector((state) => state.authReducer);
  const { error, loading, user, bearbeiten } = useAppSelector(
    (state) => state.userReducer
  );

  const { id } = useParams<string>();
  const [deleteImg, setDeleteImg] = useState(false);
  const [dataPost, setDataPost] = useState<IInterfaceUser>({});
  const [validToken, setValidToken] = useState<boolean>();

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
      name: "profession",
      value: user.profession,
    },
    {
      item: "ALLERGIE",
      name: "allergies_text",
      value: user.allergies_text,
    },
    {
      item: "NOTFALLKONTAKT",
      name: "contact",
      value: user.contact,
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

  if (loading) {
    return <Box textColor="white">Loading...</Box>;
  }

  if (error) {
    return <Box textColor="white">Warring!!!</Box>;
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
        {allGroups
          .filter((elem) => elem.is_akte === false)
          .map((el) => (
            <Box key={el.id}>
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
          ))}
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
    </Fragment>
  );
}
