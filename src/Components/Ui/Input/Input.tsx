// External dependencies
import { Input } from "@chakra-ui/react";

type InputTypeColor = "secondaryLittleGray";

type InputTypeTextTransform = "uppercase" | "lowercase" | "capitalize";

interface IInputProps {
  color?: string;
  fontSize?: string;
  display?: string;
  rounded?: string;
  onChange: (value?: string) => void;
  value?: string;
  width?: string;
  weight?: string;
  height?: string;
  paddingY?: string;
  paddingX?: string;
  fontFamily?: string;
  placeholder?: string;
}

interface CustomInputProps extends IInputProps {
  typeColor?: InputTypeColor;
  textTransform?: InputTypeTextTransform;
}

export default function MyInput(props: CustomInputProps) {
  const {
    color,
    display,
    fontFamily,
    fontSize,
    height,
    onChange,
    paddingX,
    paddingY,
    placeholder,
    rounded,
    textTransform,
    value,
    typeColor,
    weight,
    width,
  } = props;

  return (
    <Input
      maxW={width ? width : "313px"}
      h={height}
      py={paddingY}
      px={paddingX}
      textTransform={textTransform}
      value={value}
      bg={typeColor}
      fontWeight={weight}
      fontSize={fontSize}
      rounded={rounded}
      onChange={(e) => onChange(e.target.value)}
      textColor={color}
      display={display}
      fontFamily={fontFamily}
      placeholder={placeholder}
    />
  );
}
