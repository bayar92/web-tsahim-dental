import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  borderRadius: "8px",
};

const sizes: Record<string, SystemStyleObject> = {
  md: {
    px: "24px",
  },
};
// default -> active -> hover -> focused -> disabled -> loading
const variants = {
  delete: {
    bg: "transparent",
    color: "red.500",
    _hover: {
      bg: "red.100",
    },
    size: "sm",
    borderWidth: "1px",
    borderColor: "red.500",
  },
  default: {
    bg: "primary.500",
    color: "white",
    _hover: {
      bg: "primary.600",
    },
    _active: {
      bg: "primary.700",
      boxShadow: "0px 1px 2px rgba(13, 16, 23, 0.06), 0px 0px 0px 4px #DFF1FD;",
    },
    _focused: {
      boxShadow: "0px 1px 2px rgba(13, 16, 23, 0.06), 0px 0px 0px 4px #DFF1FD;",
    },
    px: "18px",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "500px",
    py: "10px",
  },
  secondary: {
    color: "gray.700",
    bg: "transparent",
    _hover: {
      bg: "gray.50",
    },
    size: "md",
    fontSize: "14px",
    fontWeight: "500",
    border: "1px solid",
    borderColor: "gray.300",
    borderRadios: "8px",
    boxShadow: "0px 1px 2px rgba(13, 16, 23, 0.06)",
  },
  secondary_rounded: {
    h: "40px",
    boxSizing: "border-box",
    borderRadius: "999px",
    bg: "white",
    color: "gray.900",
    border: "1px solid",
    _hover: { bg: "gray.50" },
    borderColor: "gray.200",
    fontSize: "14px",
    fontWeight: 500,
    boxShadow: "0px 1px 2px rgba(13, 16, 23, 0.06)",
  },
  ghost_rounded: {
    h: "40px",
    boxSizing: "border-box",
    borderRadius: "999px",
    bg: "transparent",
    color: "gray.900",
    _hover: { bg: "gray.50", boxShadow: "0px 1px 2px rgba(13, 16, 23, 0.06)" },
    border: "1px solid",
    borderColor: "transparent",
    fontSize: "14px",
    fontWeight: 500,
  },
};

const defaultProps = {
  size: "md",
  variant: "default",
  casing: "capitalize",
};

const Button = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Button;
