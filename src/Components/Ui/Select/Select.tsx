import { Select as SelectChakra } from "@chakra-ui/react";
import "./style.css";

interface IoptionTypes {
  value: string;
  name: string;
}

interface ISelect {
  defaultValue: string;
  value: string;
  options: IoptionTypes[];
  onChange: (value: string) => void;
  isTransparent?: boolean;
}

export default function Select({
  options,
  defaultValue,
  value,
  onChange,
  isTransparent,
}: ISelect) {
  return (
    <SelectChakra
      value={value}
      onChange={(e) => onChange(e.target.value)}
      bg={isTransparent ? "transparent" : "#1f1f1f"}
      className="lang-select"
      color="#FFFFFF"
      variant="none"
      fontSize="14px"
      alignItems="center"
      fontWeight="300"
      // border={isTransparent ? "1px solid #4E4E4E" : "none"}
    >
      <option value="">{defaultValue}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </SelectChakra>
  );
}
