import { useTranslation } from "react-i18next";
import type { Locale } from "@/shared/types/locales";
import { Carousel, Container, Section } from "@/shared/ui";
import { CAROUSEL_IMAGES } from "./model";

interface OurWorksSectionProps {
  isMainSection?: boolean;
}

function OurWorksSection({ isMainSection }: OurWorksSectionProps) {
  const { t, i18n } = useTranslation();

  return (
    <Container width="xl">
      <Section title={t("OurWorksSection.title")} isMainSection={isMainSection}>
        <Carousel images={CAROUSEL_IMAGES[i18n.language as Locale]} />
      </Section>
    </Container>
  );
}

export default OurWorksSection;
