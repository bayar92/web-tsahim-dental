import { useAuth } from "@lib/auth/ui";
import { LandingLayout } from "@ui/components/LandingLayout";
import { Box, SEO, Spinner } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { Contact } from "./Contact";
import { HeroSection } from "./HeroSection";
import { Pricing } from "./Price/Pricing";

export const LandingPage = () => {
  const { t } = useTranslation("app");

  return (
    <Box w="full">
      <SEO title={"Нүүр"} />
      <LandingLayout>
        <HeroSection />
        <Pricing  />
        <Contact />
      </LandingLayout>
    </Box>
  );
};
