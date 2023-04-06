// External dependencies
import { Button } from "@chakra-ui/react";

type ButtonTypeColor = "darkGrey" | "littleBlack";

type ButtonTypeTextTransform = "uppercase" | "lowercase" | "capitalize";

interface IButtonProps {
  color?: string;
  fontSize?: string;
  children?: React.ReactNode;
  display?: string;
  rounded?: string;
  onClick?: () => void;
  title?: string;
  width?: string;
  weight?: string;
  height?: string;
  paddingY?: string;
  paddingX?: string;
  fontFamily?: string;
}

interface CustomButtonProps extends IButtonProps {
  typeColor?: ButtonTypeColor;
  textTransform?: ButtonTypeTextTransform;
}

export default function MyButton(props: CustomButtonProps) {
  const {
    children,
    color,
    display,
    height,
    onClick,
    paddingX,
    paddingY,
    rounded,
    textTransform,
    title,
    typeColor,
    width,
    weight,
    fontSize,
    fontFamily,
  } = props;

  return (
    <Button
      w={width ? width : "102px"}
      h={height ? height : "26px"}
      display={display}
      py={paddingY}
      px={paddingX}
      rounded={rounded}
      textTransform={textTransform}
      color={color}
      bg={typeColor}
      onClick={onClick}
      pos="static"
      fontSize={fontSize ? fontSize : "10px"}
      fontWeight={weight ? weight : "700"}
      fontFamily={fontFamily ? fontFamily : "Inter"}
      colorScheme="none"
    >
      {children ? children : title}
    </Button>
  );
}
