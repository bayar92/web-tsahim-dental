import { SystemStyleObject, mode } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {};

const sizes: Record<string, SystemStyleObject> = {};

const variants = {
  default: (props: any) => ({
    w:"full"
  }),
};

const defaultProps = {
  variant: "default",
};


const Form = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Form;
