// External dependencies
import { Input } from "@chakra-ui/react";

type InputTypeColor = "secondaryLittleGray";

type InputTypeTextTransform = "uppercase" | "lowercase" | "capitalize";

interface IInputProps {
  color?: string;
  display?: string;
  disabled?: boolean;
  rounded?: string;
  onChange: (value?: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  width?: string;
  weight?: string;
  height?: string;
  fontFamily?: string;
  placeholder?: string;
  name?: string;
  marginBottom?: string;
}

interface CustomInputProps extends IInputProps {
  typeColor?: InputTypeColor;
  textTransform?: InputTypeTextTransform;
}

export default function MyInput(props: CustomInputProps) {
  const {
    color,
    display,
    disabled,
    fontFamily,
    height,
    onChange,
    placeholder,
    rounded,
    textTransform,
    value,
    typeColor,
    weight,
    width,
    name,
    marginBottom,
  } = props;

  return (
    <Input
      type="text"
      maxW={width ? width : "313px"}
      h={height ? height : "19px"}
      px="0px"
      textTransform={textTransform}
      value={value}
      bg={typeColor ? typeColor : "black"}
      fontWeight={weight}
      fontSize="14px"
      rounded={rounded}
      onChange={(e) => onChange(e)}
      textColor={color ? color : "white"}
      display={display}
      fontFamily={fontFamily}
      placeholder={placeholder}
      name={name}
      mb={marginBottom}
      borderColor="transparent"
      focusBorderColor="black"
      py="10px"
      disabled={disabled}
    />
  );
}
