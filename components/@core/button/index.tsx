import { normalize } from "@/helper/helpers";
import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Row from "../row";
import { styleGlobal } from "../styles";
import TextDefault from "../text-default";

interface ButtonPrimaryProps {
  round?: number;
  onPress: () => void;
  title?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
  minWidth?: number | "100%" | "80%" | "90%";
  disabled?: boolean;
  full?: boolean;
  borderColor?: string;
  textColor?: string;
  activeOutlined?: boolean;
  bgColor?: string | any;
  styleTitle?: StyleProp<TextStyle>;
  styleButton?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  height?: number;
  register?: boolean;
}
interface IconButtonProps extends ButtonPrimaryProps {
  icon: React.ReactNode;
  border?: boolean;
}

const ButtonPrimary = ({
  full,
  round = normalize(15),
  onPress,
  isLoading,
  title,
  iconLeft,
  iconRight,
  minWidth = 100,
  disabled = false,
  bgColor,
  styleTitle,
  styleButton,
  height = normalize(50),
  register = false,
  backgroundColor,
}: ButtonPrimaryProps) => {
  return (
    <TouchableOpacity
      onPress={isLoading ? () => {} : onPress}
      disabled={disabled || isLoading}
      style={[
        style.btn,
        styleGlobal.shadow,
        {
          minWidth: minWidth,
          borderRadius: round,
          backgroundColor: "#5451D6",
          padding: normalize(5),
          width: "48%",
          height,
        },
        bgColor && { backgroundColor: bgColor },
        disabled && style.disabled,
        styleButton && styleButton,
        full && { width: "100%" },
        backgroundColor && { backgroundColor: backgroundColor },
      ]}
    >
      {isLoading && <ActivityIndicator color={"white"} />}
      {!isLoading && iconLeft && iconLeft}
      <TextDefault
        style={[
          {
            color: "white",
            fontWeight: 600,
            textAlign: "center",
            fontSize: normalize(13),
          },
          styleTitle,
        ]}
      >
        {title}
      </TextDefault>

      {!isLoading && iconRight && iconRight}
    </TouchableOpacity>
  );
};

const ButtonOutlined = ({
  full,
  round = normalize(15),
  onPress,
  isLoading,
  title,
  iconLeft,
  iconRight,
  minWidth = 100,
  disabled = false,
  activeOutlined = false,
  borderColor,
  height = normalize(32),
}: ButtonPrimaryProps) => {
  return (
    <TouchableOpacity
      onPress={isLoading ? () => {} : onPress}
      disabled={disabled || isLoading}
      style={[
        style.btn,
        styleGlobal.border,
        styleGlobal.shadow,
        {
          borderRadius: round,
          borderColor: "#5451D6",
          width: 100,
          minWidth,
          height,
          backgroundColor: "rgba(0,0,0,0.05)",
        },
        full && { width: "100%" },
        disabled && style.disabled,
      ]}
    >
      <Row center style={{ height: "100%" }}>
        {isLoading && <ActivityIndicator color={"blue"} />}
        {!isLoading && iconLeft && iconLeft}
        <TextDefault
          style={[
            {
              color: "#5451D6",
              fontWeight: 600,
            },
            style.txt,
          ]}
        >
          {title}
        </TextDefault>
        {!isLoading && iconRight && iconRight}
      </Row>
    </TouchableOpacity>
  );
};

const IconButton = ({
  round = 100,
  onPress,
  isLoading,
  iconLeft,
  iconRight,
  disabled = false,
  icon,
  backgroundColor,
  borderColor = "rgba(116, 90, 255, 0.3)",
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={isLoading ? () => {} : onPress}
      disabled={disabled}
      style={[
        styleGlobal.centerChild,
        styleGlobal.border,
        styleGlobal.shadow,
        {
          borderRadius: round,
          width: normalize(45),
          height: normalize(45),
          backgroundColor: backgroundColor,
          borderColor: borderColor || "black",
        },
        disabled && style.disabled,
        disabled && style.disabled,
      ]}
    >
      {isLoading && <ActivityIndicator color={"blue"} />}
      {!isLoading && iconLeft && iconLeft}
      {icon && icon}
      {!isLoading && iconRight && iconRight}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btn: {
    // padding: normalize(15),
    // paddingVertical: 12,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 10,
    height: normalize(30),
    minWidth: normalize(42),
  },
  disabled: {
    opacity: 0.5,
  },
  txt: {
    fontSize: normalize(12),
    textTransform: "capitalize",
  },
});

export { ButtonOutlined, ButtonPrimary, IconButton };
