import { useTranslation } from "react-i18next";
import type { Locale } from "@/types/locales";
import { CAROUSEL_IMAGES } from "./OurWorksSection.config";
import Container from "@/components/ui/Container/Container";
import Section from "@/components/ui/Section/Section";
import Carousel from "@/components/ui/Carousel/Carousel";

function OurWorksSection() {
  const { t, i18n } = useTranslation();

  return (
    <Container width="xl">
      <Section title={t("OurWorksSection.title")}>
        <Carousel images={CAROUSEL_IMAGES[i18n.language as Locale]} />
      </Section>
    </Container>
  );
}

export default OurWorksSection;
