import React from "react";
import { CustomButton } from "./button.style";

const Button = ({ children, onClick }) => {
  return <CustomButton onClick={onClick}>{children}</CustomButton>;
};

export default Button;
