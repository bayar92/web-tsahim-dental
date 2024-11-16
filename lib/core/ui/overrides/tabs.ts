import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  borderRadius: "3px",
};

const sizes: Record<string, SystemStyleObject> = {
  md: {
    px: "24px",
  },
};

const variants = {
  topbordered: {
    root: {},
    tabpanels: { pt: "5" },
    tabpanel: {
      p: "0",
    },
    tab: {
      fontWeight: "900",
      borderTop: "2px",
      pl: "0",
      pb: "0",
      fontSize: "sm",
      textAlign: "center",
      color: "primary.200",
      _selected: {
        color: "primary.700",
      },
    },
  },
};

const defaultProps = {
  size: "md",
  variant: "enclosed",
  casing: "capitalize",
};

const Tabs = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Tabs;
