import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {};

const sizes: Record<string, SystemStyleObject> = {};

const variants = {
  normal: {
    color: "gray.600",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px",
  },
};

const defaultProps = {
  variant: "normal",
};

const Text = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Text;
