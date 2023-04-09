/* External dependencies */
import { Box, Text } from "@chakra-ui/react";
import { Fragment, useState } from "react";

/* Local dependencies */
import Card from "../../Components/Ui/Card/Card";
import MyButton from "../../Components/Ui/Button/Button";
import MyInput from "../../Components/Ui/Input/Input";
import Exemple from "../../assets/Image/Exemple.png";
import SvgDot from "../../assets/svg/SvgDot";

export default function Notfall() {
  const [disabled, setDisabled] = useState(true);
  const [deleteImg, setDeleteImg] = useState(false);
  const [dataPost, setDataPost] = useState({
    name: "",
    verfassen: "",
    geburtsdatum: "",
    allergie: "",
    notfallkontakt: "",
    besonderheiten: "",
  });

  const dots = [];

  for (let i = 0; i < 3; i++) {
    dots.push(<SvgDot key={i} />);
  }

  const listInput = [
    {
      item: "NAME",
      name: "name",
      value: "",
    },
    {
      item: "BILDUNTERSCHRIFT VERFASSEN",
      name: "verfassen",
      value: "",
    },
    {
      item: "GEBURTSDATUM",
      name: "geburtsdatum",
      value: "",
    },
    {
      item: "ALLERGIE",
      name: "allergie",
      value: "",
    },
    {
      item: "NOTFALLKONTAKT",
      name: "notfallkontakt",
      value: "",
    },
    {
      item: "BESONDERHEITEN",
      name: "besonderheiten",
      value: "",
    },
  ];

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };

  const listImage = [
    { id: 1, title: "Text about  picture 1", image: Exemple },
    { id: 2, title: "Text about  picture 2", image: Exemple },
  ];

  function deletedImage(id: number) {
    console.log(id);
  }

  return (
    <Fragment>
      <Box display="flex" justifyContent="end">
        <MyButton
          typeColor="darkGrey"
          fontFamily="commissioner"
          marginRight="30px"
          onClick={() => setDisabled(!disabled)}
        >
          Bearbeiten
        </MyButton>
      </Box>
      <Box>
        {listInput.map((el, index) => (
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
              disabled={disabled}
            />
          </Box>
        ))}
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
        {listImage.map((el) => (
          <Card
            key={el.id}
            el={el}
            deleteImg={deleteImg}
            handleId={deletedImage}
          />
        ))}

        {!disabled && (
          <MyButton
            typeColor="lightGray"
            width="100%"
            rounded="0px"
            color="black"
            fontFamily="inter"
            fontSize="10px"
            marginBottom="21px"
            marginTop="70px"
          >
            SPEICHERN & VERLASSEN
          </MyButton>
        )}
      </Box>
    </Fragment>
  );
}
