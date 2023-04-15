/* External dependencies */
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

/* Local dependencies */
import Card from "../../Components/Ui/Card/Card";
import MyButton from "../../Components/Ui/Button/Button";
import MyInput from "../../Components/Ui/Input/Input";
import SvgDot from "../../assets/svg/SvgDot";
import API, { API_ADDRESS } from "../../Api";

import { useAppSelector } from "../../Hooks/Hooks";
import { useActionsFile, useActionsUser } from "../../Hooks/useActions";
import { IInterfaceUser } from "../../Components/Interface/redux/types/Types";
import { IGroupsTypes } from "../../Components/Interface/redux-image/types/Types";
import { getAccessToken } from "../../Components/Helpers";
import Registration from "../../Components/Registration/Registration";

export default function Notfall() {
  const { ActionGetUser, ActionPutUser, ActionBearbeiten } = useActionsUser();
  const { ActionAllGroups, ActionAllGroupsForCardId } = useActionsFile();
  const { allGroups } = useAppSelector((state) => state.filesReducer);
  const { error, loading, user, bearbeiten } = useAppSelector(
    (state) => state.userReducer
  );

  const { id } = useParams<string>();
  const [deleteImg, setDeleteImg] = useState(false);
  const [dataPost, setDataPost] = useState<IInterfaceUser>({});
  const [validToken, setValidToken] = useState<boolean>();
  const [activeAuth, setActiveAuth] = useState(false);

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
        alert("Success");
        ActionGetUser(id);
      })
      .catch(() => {
        alert("Error");
      });
  }

  function handleClickPut() {
    ActionPutUser({
      allergies: dataPost.allergies || user.allergies,
      allergies_text: dataPost.allergies_text || user.allergies_text,
      avatar: dataPost.avatar || user.avatar || "",
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
      setActiveAuth(true);
    }
  }

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
              validToken ? setActiveAuth(true) : setDeleteImg(!deleteImg)
            }
          >
            {dots}
          </Box>
        )}
        {allGroups
          .filter((elem) => elem.is_akte === false)
          .map((el) => (
            <Box key={el.id}>
              <Text color="White" fontFamily="inter" fontSize="18px" mb="20px">
                {el.title}
              </Text>
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

      {activeAuth && (
        <Box
          pos="fixed"
          top="0"
          bottom="0"
          left="0"
          right="0"
          display="flex"
          alignItems="center"
        >
          <Registration setModal={setActiveAuth} />
        </Box>
      )}
    </Fragment>
  );
}
