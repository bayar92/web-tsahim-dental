import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  field: {},
};

const sizes: Record<string, SystemStyleObject> = {
  xs: {
    field: {
      borderRadius: "sm",
      fontSize: "xs",
      height: 6,
      paddingX: 2,
    },
  },
  sm: {
    field: {
      borderRadius: "sm",
      fontSize: "sm",
      height: 8,
      paddingX: 3,
    },
  },
  md: {
    field: {
      borderRadius: "md",
      fontSize: "md",
      height: 10,
      paddingX: 4,
    },
  },
  lg: {
    field: {
      borderRadius: "md",
      fontSize: "lg",
      height: 12,
      paddingX: 4,
    },
  },
};

const variants = {
  search: {
    field: {
      color: "blue.700",
      background: "none",
      borderRadius: "0",
      border: "none",
      borderBottom: "1px",
      borderColor: "blue.700",
      fontSize: "sm",
      fontWeight: "normal",
      _placeholder: {
        color: "blue.700",
      },
      _hover: {
        borderColor: "blue.700",
      },
      _focus: {
        zIndex: 1,
        borderColor: "blue.700",
        background: "none",
      },
      _light: {
        _focus: {},
      },
      _dark: {
        _focus: {},
      },
    },
  },
  widgetInput: {
    field: {
      // font weight 700
      fontWeight: "700",
      fontSize: "xs",
      background: "offWhite",
      border: "1px solid",
      borderColor: "blue.100",
      borderRadius: "0px",
      height: "34px",
      pb: "1px",
      color: "blue.800",
      lineHeight: "32px",
      _placeholder: {
        fontWeight: 400,
        // italic font
        fontStyle: "italic",
        //font 11px
        fontSize: "11px",
        color: "gray.300",
        // line height 18px
        lineHeight: "18px",
      },
      _focus: {
        background: "offWhite",
        borderColor: "blue.100",
        color: "blue.800",
      },
    },
  },
  outline: {
    field: {
      background: "red",
      border: "1px solid",
      borderColor: "inherit",
      _focus: {
        zIndex: 1,
        borderColor: "#3182ce",
        boxShadow: "0 0 0 1px #3182ce",
      },
      _hover: { borderColor: "gray.300" },
    },
  },
  default: {
    field: {
      w: "full",
      background: "white",
      border: "1px solid",
      borderColor: "gray.300",
      borderRadius: "8px",
      p: "0",
      _focus: {
        bg: "white",
        border: "1px solid",
        borderColor: "primary.500",
        boxShadow:
          "0px 1px 2px rgba(13, 16, 23, 0.06), 0px 0px 0px 4px #DFF1FD",
      },
      fontSize: "sm",
      color:"gray.900",
      lineHeight: "tall",
      _hover: { borderColor: "gray.300" },
      boxShadow: "0px 1px 2px rgba(13, 16, 23, 0.06)",
    },
  },
  filled: {
    field: {
      background: "gray.100",
      border: "2px solid",
      borderColor: "transparent",
      _focus: {
        background: "transparent",
        borderColor: "#3182ce",
      },
      _hover: {
        background: "gray.300",
      },
    },
  },
  landingInput: {
    field: {
      borderRadius: "10px",
      h: 14,
      fontSize: "20px",
      bg: "white",
      pl: "4",
      pr: "14",
      _focus: {
        bg: "white",
        border: "1px solid",
        borderColor: "primary.500",
        boxShadow:
          "0px 1px 2px rgba(13, 16, 23, 0.06), 0px 0px 0px 4px #DFF1FD",
      },
    },
  },
};

const defaultProps = {
  size: "md",
  variant: "default",
};

const Input = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Input;
