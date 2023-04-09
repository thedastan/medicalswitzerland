/* External dependencies */
import { Box, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/react";
import { Fragment, useState } from "react";

/* Local dependencies */
import Card from "../../Components/Ui/Card/Card";
import Exemple from "../../assets/Image/Exemple.png";
import MyButton from "../../Components/Ui/Button/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

export default function Akte() {
  const [disabled, setDisabled] = useState(true);
  const [deleteImg, setDeleteImg] = useState(false);
  const [dataPost, setDataPost] = useState({});

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // dotsClass: "slick-dots custom-dots-class",
  };

  const listInput = [
    {
      item: "OPERATIONEN",
      name: "operationen",
      value: "",
    },
    {
      item: "ALLERGIE",
      name: "allergie",
      value: "",
    },
    {
      item: "MEDIKAMENTE",
      name: "medikamente",
      value: "",
    },
    {
      item: "NEDENDIAGNOSEN",
      name: "nedendiagnose",
      value: "",
    },
    {
      item: "BERUF",
      name: "beruf",
      value: "",
    },
    {
      item: "LOCATION",
      name: "location",
      value: "",
    },
  ];

  const listImage = [
    { id: 1, title: "Text about  picture 1", image: Exemple },
    { id: 2, title: "Text about  picture 2", image: Exemple },
  ];

  const inputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataPost({ ...dataPost, [e.target.name]: e.target.value });
  };

  function deletedImage(id: number) {
    console.log(id);
  }

  return (
    <Fragment>
      <Text
        color="white"
        fontFamily="inter"
        textAlign="center"
        mt="48px"
        mb="6px"
      >
        PATIENTENAKTE
      </Text>
      <Text color="#C7C4C4" textAlign="center" fontSize="22px" mb="49px">
        medical
        <span style={{ color: "#E11F26" }}>switzerland</span>
      </Text>

      <Text mb="28px" color="white" textAlign="center">
        Tom Hardy
      </Text>
      <Text color="white" textAlign="center" mb="33px">
        08-10-1988
      </Text>

      <Box
        display="flex"
        justifyContent="end"
        pb="11px"
        borderBottom="1px solid #454545"
        mb="29px"
      >
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
            <Textarea
              onChange={(e) => inputChange(e)}
              name={el.name}
              rounded="0px"
              outline="black"
              resize="none"
              color="white"
              fontSize="14px"
              borderColor="black"
              disabled={disabled}
              textAlign="center"
            />
          </Box>
        ))}

        {!disabled ? (
          listImage.map((el) => (
            <Card
              key={el.id}
              el={el}
              deleteImg={deleteImg}
              handleId={deletedImage}
            />
          ))
        ) : (
          <Slider {...settings}>
            {listImage.map((el) => (
              <Card
                key={el.id}
                el={el}
                deleteImg={deleteImg}
                handleId={deletedImage}
              />
            ))}
          </Slider>
        )}

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
